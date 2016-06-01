'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.listen(8000);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/movieApp', express.static('./src/client'));
app.use('/', express.static('./src/client'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});