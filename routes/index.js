/**
 * Created by Admin on 4/30/16.
 */
'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', (req, res) => {
    var indexPath = path.join(__dirname, '../views/index.html');
res.sendFile(indexPath);
});

router.get('/api', require('./api'));

module.exports = router;