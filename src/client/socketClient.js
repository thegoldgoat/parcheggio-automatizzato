const API_URL = "http://192.168.43.43:8080/";

function ArrivoMacchina() {
    var socket = io(API_URL); 
    socket.on('connect', function () {
    var form = $('form[name="formArrivo"]').serializeArray();
    var data = JSON.stringify({ id_parcheggio: parseInt(form[0].value), targa: form[1].value });
    socket.emit("arrivoMacchina", data, function (xhr) {
      if(xhr.status == 200)
        console.log("Targa accettata");
      else
        console.log("Targa rifiutata");
    });
  });
}

function UscitaMacchina() {
    var socket = io(API_URL); 
    socket.on('connect', function () {
    var form = $('form[name="formArrivo"]').serializeArray();
    var data = JSON.stringify({ id_parcheggio: parseInt(form[0].value), targa: form[1].value });
    socket.emit("uscitaMacchina", data, function (data, xhr) {
      if(xhr.status == 200)
        console.log(JSON.stringify(data));
      else
        console.log("Targa rifiutata");
    });
  });
  $('form[name="formArrivo"]').trigger("reset");
}