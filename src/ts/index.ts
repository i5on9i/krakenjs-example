'use strict';

import express from 'express';
import kraken from 'kraken-js';
import spec from './lib/spec';
import flash from 'connect-flash';

const app: any = express();
const options = spec(app)

app.use(kraken(options));
app.use(flash());

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

export default app;