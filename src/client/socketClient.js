const API_URL = "http://localhost:8080/";

function ArrivoMacchina() {
  var socket = io(API_URL);
  socket.on('connect', function () {
    var form = $('form[name="formArrivo"]').serializeArray();
    var data = JSON.stringify({ id_parcheggio: form[0].value, targa: form[1].value });
    socket.emit("arrivoMacchina", data, function (xhr) {
      if (xhr == 200)
        alert("Targa accettata");
      else
        alert("Targa rifiutata");
      $('form[name="formArrivo"]').trigger("reset");
    });
  });
}

function UscitaMacchina() {
  var socket = io(API_URL);
  socket.on('connect', function () {
    var form = $('form[name="formUscita"]').serializeArray();
    var data = JSON.stringify({ id_parcheggio: form[0].value, targa: form[1].value });
    socket.emit("uscitaMacchina", data, function (data, xhr) {
      if (xhr == 200)
        alert(data);
      else
        alert("Targa rifiutata");
      $('form[name="formUscita"]').trigger("reset");
    });
  });
}