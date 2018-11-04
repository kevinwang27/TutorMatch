var express = require('express');
var app = express();
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.redirect('https://placeholder.com/login');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/home', function(req, res) {
    res.render('home');
});

app.listen(3000);
console.log('launched');