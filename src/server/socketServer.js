const API_PORT = 8080;
const server = require('http').createServer();
const io = require('socket.io');

var io = require('socket.io')();
io.on('connection', function(client){
    console.log('Client connected', client);
    client.on('arrivoMacchina', (jsonData, fn) => {
        // Process response
        console.log(jsonData);
        fn('400');
    });
    client.on('uscitaMacchina', (jsonData, fn) => {
        // Process response
        console.log(jsonData);
        fn('400');
    });
});

io.listen(API_PORT);
