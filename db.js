

var pg = require('pg');

var dbFunc = function () {

    var client;

    function connect() {
        var conString = process.env.DATABASE_URL || "postgres://postgres:Welcome123@localhost:5432/postgres";
        console.log( 'conString : ' + conString );
        client = new pg.Client(conString);
        client.connect();
    }

    function insert(fullname, email, ip) {
        //var sql = "insert into register (fullname, email, ip) " +
        //"values ('" + fullname + "','" + email + "','" + ip + "')";
        var sql = 'insert into register (fullname, email, ip) ' +
        'values ($1,$2,$3);'

        console.log('sql: ' + sql);

        var query = client.query( sql,[fullname,email,ip] );
        query.then((res) => {
            console.log("saved");
        });
    }

    function insertData(fullname, email,ip){
        connect();
        insert(fullname, email, ip);
    }

    
    return {
            insertData: insertData
    }
}();


exports.insertData = dbFunc.insertData;
