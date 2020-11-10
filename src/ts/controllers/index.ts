'use strict';

import IndexModel from '../models/index';
// var IndexModel = require('../models/index');


export default function _ (router: any){
    var model = IndexModel();

    router.get('/', function (req: any, res: any) {
        
        res.send('<code><pre>' + JSON.stringify(model, null, 2) + '</pre></code>');
        // res.render('index', model);
        // res.json({})
        
        
    });	
}
