import { AnyQueryBuilder, Model } from "objection";

export default class Users extends Model {
    id!: number
    login_id!: string
    type!: string
    name!: string
    password!: string
    created_at!: Date
    updated_at!: Date

    static tableName = 'users';

    static modifiers = {
        findByUsername(query: AnyQueryBuilder, username: string, callback: (err: any, user: any) => any) {
            // if (err) { return cb(err); }
            // if (!user) { return cb(null, false); }
            // if (user.password != password) { return cb(null, false); }
            // return cb(null, user);
        },

    };

    $beforeInsert() {
        this.created_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }

}