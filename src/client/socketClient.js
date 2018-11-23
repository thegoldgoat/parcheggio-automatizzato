const API_URL = "http://localhost:8080/";
const KEY = 101;

function ArrivoMacchina() {
  var socket = io(API_URL);
  socket.on('connect', function () {
    var form = $('form[name="formArrivo"]').serializeArray();
    var data = JSON.stringify({ id_parcheggio: form[0].value, targa: Cripta(form[1].value, KEY) });
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
    var data = JSON.stringify({ id_parcheggio: form[0].value, targa: Cripta(form[1].value, KEY) });
    socket.emit("uscitaMacchina", data, function (data, xhr) {
      if (xhr == 200)
        alert(data);
      else
        alert("Targa rifiutata");
      $('form[name="formUscita"]').trigger("reset");
    });
  });
}

function Cripta(str, amount) {
  var output = '';
  if (amount >= 0) {
    amount = amount % 256;
  } else {
    amount = 256 - Math.abs(amount) % 256;
  }
  for (var i = 0; i < str.length; i++) {
    var c = str[i];
    var code = str.charCodeAt(i);
    c = String.fromCharCode((code + amount) % 256);
    output += c;
  }
  return output;
};