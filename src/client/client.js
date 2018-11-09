function AggiungiMacchina()
{
    const API_URL = "http://localhost:8080/";
    var form = $('form').serializeArray();
    var arr = {id_parcheggio:form[0].value, targa:form[1].value};
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
};