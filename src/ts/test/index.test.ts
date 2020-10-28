/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


import kraken from 'kraken-js';
import express from 'express';
import path from 'path';
import request from 'supertest';


describe('index', function () {

    var app, mock: any;


    beforeEach(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: path.resolve(__dirname, '..')
        }));

        mock = app.listen(1337);

    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('should say "hello"', function (done) {
        request(mock)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            
                .expect(/Hello, /)
            
            .end(function (err, res) {
                done(err);
            });
    });

});
