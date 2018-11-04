var express = require('express');
var http = require('http');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/about', function(req, res) {
    res.('another');
});

http.createServer(app).listen(3000);
console.log('launched');