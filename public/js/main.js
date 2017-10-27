$(document).ready(function(){

 

    $("#signup").click(function(){
        $.ajax({
            url: "/api/add",
            method : "post",
            data: JSON.stringify( { "email": $('#email').val() } ),
            success: function(data, status){
                $('#response').html( JSON.stringify( data ) );
            }
        })
    });
});