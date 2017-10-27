$(document).ready(function(){
    $("signup").click(function(){
        $.post("api/add",
        {
            email: $('email')
        },
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});