$(document).ready(function(){

    var ip = "";

    $.getJSON("https://jsonip.com/?callback=?", function (data) {
        ip = data.ip;
    });

    $("#signup").click(function(){
        $.ajax({
            url: "/api/add",
            method : "post",
            data: { "fullname" : $('#fullname').val(), "email": $('#email').val(), "ip" : ip },
            success: function(data, status){
                $('#response').html( JSON.stringify( data ) );
                $('#fullname').val("");
                $('#email').val("");
            }
        })
    });
});