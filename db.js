var fs = require('fs');
var pg = require('pg');

var dbFunc = function () {

    var client;

    function connect() {
        var conString = process.env.DATABASE_URL || 'local';
        if (conString != 'local'){
            console.log( 'conString : ' + conString );
            client = new pg.Client(conString);
            client.connect();
            return true;
        }else{
            return false;
        }

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
        if (connect()){
            insert(fullname, email, ip);
        }else{
            console.log("fullname: " + fullname + "," + "email: " + email +"," + "ip: " + ip);
        }
       
    }

    function retrieve(){ 
        if(connect()){
            var sql = 'select fullname,email from register';
    
            client.query( sql, (err,result) =>{
                if (!err){
                    var file = fs.createWriteStream('retrieve.tbl');
                    file.on('error', function(err) { console.log('file creation error') });
                    var rows = result.rows;
                    rows.forEach(function(row) { file.write(row + '\n'); });
                    file.end();
                }
                client.end();
            } );
        }else{
            save("retrieve cannot be local");
        }
    }

    function save(result){
        
        fs.writeFile("./retrieve.tbl", result, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        });

    }
    return {
            insertData: insertData,
            retrieve :  retrieve
    }
}();


exports.insertData = dbFunc.insertData;
exports.retrieve = dbFunc.retrieve;
