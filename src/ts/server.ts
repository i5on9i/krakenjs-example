'use strict';

import app from './index';
import http from 'http';

var server;

/*
 * Create and start HTTP server.
 */

server = http.createServer(app);
server.listen(process.env.PORT || 8000);
server.on('listening', function (this: any) {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
