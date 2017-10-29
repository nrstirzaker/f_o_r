

var pg = require('pg');

var dbFunc = function () {

    var client;

    function connect() {
        var conString = process.env.DATABASE_URL || "postgres://postgres:Welcome123@localhost:5432/postgres";
        client = new pg.Client(conString);
        client.connect();
    }

    function insert(email, ip) {
        var query = client.query("insert into regsiter (email,ip) " +
            "values ('" + email + "','" + ip + "')");
        query.on("end", function (result) {
            client.end();
        });
    }

    function insertData(email,ip){
        connect();
        insert(email,ip || "");
    }

    //return public interface
    return {
            //...
            insertData: insertData
    }
}();


exports.insertData = dbFunc.insertData;
