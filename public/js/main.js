$(document).ready(function () {

    var ip = "";

    $.getJSON("https://jsonip.com/?callback=?", function (data) {
        ip = data.ip;
    });

    responseCallback = function (data, status) {

        data = data || 'Error - You have not been registered. Please contact : friendsofripleycoeschool@gmail.com'

        $('#response').html(JSON.stringify(data));
        $('#fullname').val("");
        $('#email').val("");

    }

    getData = function () {
        return { "fullname": $('#fullname').val(), "email": $('#email').val(), "ip": ip };
    }


    $("#signup").click(function () {

        $('#registrationForm').validate(
            $.ajax({
                url: "/api/add",
                method: "post",
                data: getData(),
                success: responseCallback()
    
            });
        );



    });
});