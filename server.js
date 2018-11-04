var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('./api/models/model');
var bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tutorDB'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes'); //importing routes
routes(app); //register the route

app.listen(3000);
console.log('launched');