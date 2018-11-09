const API_URL = "http://localhost:8080/";
var arr = {id_parcheggio:1, targa:"DE123FG"};
$.ajax(
   {
        url: (API_URL + "arrivoMacchina"),
        type: "POST",
        data: arr,
        dataType: 'json',
        async: false,
        success: function(msg) {
            alert(msg);
        }
    }
);