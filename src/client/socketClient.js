const API_URL = "http://localhost:8080/";
const KEY = 6;

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
  // if (amount < 0)
  //   return Cripta(str, amount + 26);
  var output = '';
  var amountLetter = Math.abs(amount) % 26;
  for (var i = 0; i < str.length; i++) {
    var c = str[i];
    var code = str.charCodeAt(i);
    if (c.match(/[a-z]/i)) {
      c = String.fromCharCode(((code - 65 + (amount < 0 ? amount + 26 : amount)) % 26) + 65);
    } else if (c.match(/[0-9]/)) {
      c = String.fromCharCode(((code - 48 + (amount < 0 ? amount + 10 : amount)) % 10) + 48);
    }
    output += c;
  }
  return output;
};