

var pg = require('pg');

var dbFunc = function () {

    var client;

    function connect() {
        var conString = process.env.DATABASE_URL || "postgres://postgres:Welcome123@localhost:5432/postgres";
        console.log( 'conString : ' + conString );
        client = new pg.Client(conString);
        client.connect();
    }

    function insert(email, ip) {
        var sql = "insert into regsiter (email,ip) " +
        "values ('" + email + "','" + ip + "')";

        console.log('sql: ' + sql);

        var query = client.query( sql );
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
