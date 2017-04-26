require('./core/server.js');

 














////var sql = require('mssql');

////var dbConfig = {
////    server: "localhost\\SQL2012EXPRESS",
////    database: "Music_DB",
////    user: "sa",
////    password: "Harish",
////    port: 1433 //default port for Ms-SQL server
////};
//////TBL_ARTISTS
////function getArtists(){
////    //creating connection object. not connected yet
////    var conn = new sql.Connection(dbConfig);
        
////    /////===== Approach 1 (Promises approach)
////    conn.connect()
////    .then(function () {
////        var req = new sql.Request(conn);
////        req.query("select * from tbl_artists")
////        .then(function (recordset) {
////            console.log(recordset);
////            conn.close();
////        })
////        .catch(function (err) {
////            console.log(err);
////            conn.close();
////        });       
////    })
////    .catch(function (err) {
////        console.log(err);
////    });
    


////    /////=== Approach 2
////    //////creating request object
////    ////var req = new sql.Request(conn);
////    ////// connecting MS-SQL server. Opening connection 
////    ////conn.connect(function (err) {
////    ////    //if error occur 
////    ////    if (err) {
////    ////        console.log(err);
////    ////        return;
////    ////    }
////    ////    // if no error
////    ////    req.query("select * from tbl_artists", function (err, recordset) {
////    ////        if (err) {
////    ////            console.log(err);
////    ////            return;
////    ////        } else {
////    ////            console.log(recordset);
////    ////        }
////    ////        conn.close();
////    ////    });
////    ////});
////}

////getArtists();