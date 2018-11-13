const API_URL = "http://192.168.43.43:8080/";

function AggiungiMacchina() {
    var form = $('form[name="formArrivo"]').serializeArray();
    var arr = { id_parcheggio: parseInt(form[0].value), targa: form[1].value };
    $.ajax(
        {
            url: (API_URL + "arrivoMacchina"),
            type: "POST",
            data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function (msg) {
                alert(msg);
            },
            error: function (xhr) {
                if (xhr.status == 200)
                    alert("Targa accettata");
                else
                    alert("Targa rifiutata");
            }
        });
    $('form[name="formArrivo"]').trigger("reset");
};

function UscitaMacchina() {
    var form = $('form[name="formUscita"]').serializeArray();
    var arr = { id_parcheggio: parseInt(form[0].value), targa: form[1].value };
    $.ajax(
        {
            url: (API_URL + "uscitaMacchina"),
            type: "POST",
            data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function (data, statusText, xhr) {
                if (xhr.status == 200)
                    alert(JSON.stringify(data));
            },
            error: function (xhr) {
                if (xhr.status != 200)
                    alert("Targa rifiutata");
            }
        });
    $('form[name="formUscita"]').trigger("reset");
}