
import LoginModel from '../../models/login';
import passport from 'passport';

export default function _(router: any) {

    var model: any = LoginModel();


    /**
     * Display the login page. We also want to display any error messages that result from a failed login attempt.
     */
    router.get('/', function (req: any, res: any) {

        // About Flash messages
        // - https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423

        //Include any error messages that come from the login process.
        model.messages = req.flash('error');
        res.render('login', model);
    });

    /**
     * Receive the login credentials and authenticate.
     * Successful authentications will go to /profile or if the user was trying to access a secured resource, the URL
     * that was originally requested.
     *
     * Failed authentications will go back to the login page with a helpful error message to be displayed.
     */
    router.post('/auth', function (req: any, res: any) {

        passport.authenticate('local', {
            successRedirect: req.session.goingTo || '/profile',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res);

        console.log(req.flash('error'));
    });



};

