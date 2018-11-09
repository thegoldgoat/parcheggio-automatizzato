console.clear();
const API_PORT = 8080;

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', function () {
    console.error("Can't connect to database.");
    process.exit(1);
});
db.once('open', function () {
    console.log('Connected to mongo database.');
});

var app = express();
app.use(express.json());

app.post('/arrivoMacchina', function (req, res) {
    console.log(req.body);
    res.send('ciao');
});

app.get('/uscitaMacchina', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(API_PORT);
console.log('Server working');