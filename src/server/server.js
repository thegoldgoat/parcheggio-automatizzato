console.clear();
const API_PORT = 8080;
const COSTO_ORARIO = 1.5;

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

// Database schemas
// Database schemas
// * User
var macchineParcheggiateSchema = mongoose.Schema({
    id_parcheggio: Number,
    targa: String,
    datestamp: Date
});

var macchineParcheggiateModel = mongoose.model('macchineParcheggiate', macchineParcheggiateSchema);

var app = express();
app.use(express.json());

app.post('/arrivoMacchina', function (req, res) {
    console.log('arrivoMacchina: Targa ricevuta -> ', req.body);
    if (!req.body.id_parcheggio || !req.body.targa) {
        console.log('Pacchetto inviato non valido.');
        res.sendStatus(400);
        res.end();
        return;
    }

    req.body.targa = req.body.targa.toUpperCase();

    macchineParcheggiateModel.findOne({ targa: req.body.targa }, function (err, found) {
        if (err) {
            res.sendStatus(500);
            res.end();
            return;
        }
        if (found) {
            console.log('Targa gia presente');
            res.statusCode = 400;
            res.send('Targa gia presente');
            res.end();
            return;
        }
        var nuovaMacchina = new macchineParcheggiateModel({
            id_parcheggio: req.body.id_parcheggio,
            targa: req.body.targa,
            datestamp: new Date()
        });
        nuovaMacchina.save();
        res.sendStatus(200);
        res.end();
        console.log('Targa aggiunta');
        return;
    });
});

app.post('/uscitaMacchina', function (req, res) {
    console.log('uscitaMacchina: Targa ricevuta -> ', req.body);
    if (!req.body.id_parcheggio || !req.body.targa) {
        console.log('Pacchetto inviato non valido.');
        res.sendStatus(400);
        res.end();
        return;
    }

    req.body.targa = req.body.targa.toUpperCase();
    const timestampUscita = new Date();

    macchineParcheggiateModel.findOneAndDelete({ targa: req.body.targa }, function (err, found) {
        if (err) {
            res.sendStatus(500);
            res.end();
            return;
        }
        if (!found) {
            console.log('Targa non trovata!');
            res.statusCode = 400;
            res.send('Targa non trovata!');
            res.end();
            return;
        }

        var orePermanenza = Math.ceil((timestampUscita - found.datestamp) / 3600000);

        var risposta = {
            timestampArrivo: found.datestamp,
            timestampUscita: timestampUscita,
            costo_totale: orePermanenza * COSTO_ORARIO
        };
        res.status = 200;
        res.send(JSON.stringify(risposta));
        res.end();
        return;
    });
});

app.listen(API_PORT);
console.log('Server working');