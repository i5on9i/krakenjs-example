'use strict';

import express from 'express';
import Knex from 'knex';
import kraken from 'kraken-js';
import { Model } from 'objection';

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
var options = {
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


const app: any = express();
app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

export default app;