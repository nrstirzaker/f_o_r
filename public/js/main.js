$(document).ready(function () {

    var ip = "";
    var server = "";
    

    $.getJSON("https://jsonip.com/?callback=?", function (data) {
        ip = data.ip;
    });

    //responseCallback = 
    getData = function () {
        return { "fullname": $('#fullname').val(), "email": $('#email').val(), "ip": ip };
    }


    $("#signup").click(function () {

        $('#registrationForm').validate({
            rules: {
                // simple rule, converted to {required:true}
                fullname: {required:true},
                // compound rule
                email: {
                    required: true,
                    email: true
                }
            },
            submitHandler: function () {
                $.ajax({
                    url: server + "/api/add",
                    method: "post",
                    data: getData(),
                    success: function(data,status){
                            
                        data = data || {'status':'Error','message':'You have not been registered. Please contact : friendsofripleycoeschool@gmail.com'};
                
                        $('#response').html(JSON.stringify(data.message));
                        if (data.status == 'Error'){
                            $('#response').css('background-color','red');
                            $('#response').css('color','white');
                        }else{
                            $('#response').css('background-color','green');
                            $('#response').css('color','white');
                        }
                        $('#fullname').val("");
                        $('#email').val("");
                
                    }
                            
                })
            }
        })


    });
});