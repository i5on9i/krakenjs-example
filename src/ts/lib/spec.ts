import Knex from "knex";
import { Model } from "objection";
import passport from "passport";
import { Strategy } from "passport-local";
import Users from "../models/users";

export default function spec(app: any) {
    app.on('middleware:after:session', function configPassport(eventargs: any) {
        //Tell passport to use our newly created local strategy for authentication
        passport.use(
            new Strategy({
                usernameField: 'login_id',
                passwordField: 'password'
            },
            async function (username, password, done) {
                const authUser = await Users.query().findOne({
                    login_id: username,
                });
        
                // if(err) 
                //     return done(err);
                // if(!authUser) 
                //     return done(null, false);
                // if(!verifyPassword(authUser.password, password))
                //     return done(null, false);
                return done(null, authUser);
        
            }
        ));
        //Give passport a way to serialize and deserialize a user. In this case, by the user's id.
        
        // Configure Passport authenticated session persistence.
        //
        // In order to restore authentication state across HTTP requests, Passport needs
        // to serialize users into and deserialize users out of the session.  The
        // typical implementation of this is as simple as supplying the user ID when
        // serializing, and querying the user record by ID from the database when
        // deserializing.
        passport.serializeUser((user: any, done) => {
            done(null, user.login_id);
        });
        
        //ASYNC ALL THE THINGS!!
        passport.deserializeUser(async (username, done) => {
            try {
                const user = await Users.query().findOne({
                    login_id: username,
                });
                if (!user) {
                    return done(new Error('user not found'));
                }
                done(null, user);
            } catch (e) {
                done(e);
            }
        });

        app.use(passport.initialize());
        app.use(passport.session());
    });
    return {
        onconfig: function (config: any, next: any) {
            const dbConfig = config.get('database')
    
            // Initialize knex.
            const knex = Knex(dbConfig);
    
            // Bind all Models to a knex instance. If you only have one database in
            // your server this is all you have to do. For multi database systems, see
            // the Model.bindKnex() method.
            Model.knex(knex);
    
            /*
             * Add any additional config setup or overrides here. `config` is an initialized
             * `confit` (https://github.com/krakenjs/confit/) configuration object.
             */
            next(null, config);
        }
    };
}