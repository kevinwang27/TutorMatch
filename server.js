var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.listen(3000);
console.log('launched');