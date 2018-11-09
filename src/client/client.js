function AggiungiMacchina()
{
    const API_URL = "http://localhost:8080/";
    var form = $('form[name="formArrivo"]').serializeArray();
    var arr = {id_parcheggio: parseInt(form[0].value), targa:form[1].value};
    $.ajax(
    {
        url: (API_URL + "arrivoMacchina"),
        type: "POST",
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        success: function(msg) {
            alert(msg);
        }
    });
    $('form[name="formArrivo"]').trigger("reset");
};

function UscitaMacchina()
{
    const API_URL = "http://localhost:8080/";
    var form = $('form[name="formUscita"]').serializeArray();
    var arr = {id_parcheggio: parseInt(form[0].value), targa:form[1].value};
    $.ajax(
    {
        url: (API_URL + "uscitaMacchina"),
        type: "POST",
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        success: function(data, statusText, xhr) {
            if(xhr.status == 200)
                alert(JSON.stringify(data));
            else
                alert("Targa rifiutata");
        }
    });
    $('form[name="formUscita"]').trigger("reset");
}