console.clear();
const API_PORT = 8080;
const io = require('socket.io')();
const mongoose = require('mongoose');
const COSTO_ORARIO = 1.5;

mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', function () {
    console.error("Can't connect to database.");
    process.exit(1);
});
db.once('open', function () {
    console.log('Connected to mongo database.');
});

var macchineParcheggiateSchema = mongoose.Schema({
    id_parcheggio: Number,
    targa: String,
    datestamp: Date
});

var macchineParcheggiateModel = mongoose.model('macchineParcheggiate', macchineParcheggiateSchema);


io.on('connection', function (client) {
    console.log('Connesso nuovo client');

    client.on('arrivoMacchina', (jsonData, fn) => {
        // Process response
        jsonData = JSON.parse(jsonData);

        if (!jsonData.id_parcheggio || !jsonData.targa) {
            console.log('Pacchetto inviato non valido.');
            fn("400");
            return;
        }

        jsonData.targa = jsonData.targa.toUpperCase();

        macchineParcheggiateModel.findOne({ targa: jsonData.targa }, function (err, found) {
            if (err) {
                fn("500");
                return;
            }
            if (found) {
                console.log('Targa gia presente');
                fn("400");
                return;
            }
            var nuovaMacchina = new macchineParcheggiateModel({
                id_parcheggio: jsonData.id_parcheggio,
                targa: jsonData.targa,
                datestamp: new Date()
            });
            nuovaMacchina.save();
            fn("200");
            console.log('Targa aggiunta');
            return;
        });
    });
    client.on('uscitaMacchina', (jsonData, fn) => {
        // Process response
        jsonData = JSON.parse(jsonData);
        if (!jsonData.id_parcheggio || !jsonData.targa) {
            console.log('Pacchetto inviato non valido.');
            fn('', "400");
            return;
        }

        jsonData.targa = jsonData.targa.toUpperCase();
        const timestampUscita = new Date();

        macchineParcheggiateModel.findOneAndDelete({ targa: jsonData.targa }, function (err, found) {
            if (err) {
                fn('', "500");
                return;
            }
            if (!found) {
                console.log('Targa non trovata!');
                fn('', "400");
                return;
            }

            var orePermanenza = Math.ceil((timestampUscita - found.datestamp) / 3600000);

            var risposta = {
                timestampArrivo: found.datestamp,
                timestampUscita: timestampUscita,
                costo_totale: orePermanenza * COSTO_ORARIO
            };

            fn(JSON.stringify(risposta), "200");
            console.log('Targa rimossa');
            return;
        });
    });
});

io.listen(API_PORT);
