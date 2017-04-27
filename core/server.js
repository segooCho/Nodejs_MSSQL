var http = require('http');
var settings = require('../settings');
var emp = require('../controllers/employee');
var httpMsgs = require('./httpMsgs.js');
var querystring = require('querystring');

http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsgs.showHome(req, res);
            } else if (req.url === "/employees") {
                console.log("Log:GET-getEmployeesAllGET"); 
                emp.getEmployeesAllGET(req, res);                
            } else {
                httpMsgs.show404(req, res);
            }
            break;
        case "POST":
            ////POST request should have request body
            if (req.url === "/") {
                httpMsgs.showHome(req, res);
            } else if (req.url === "/employees") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data.id.toString()); 
                    //console.log(data.password.toString()); 
                    if (!data.id) httpMsgs.show405(req, res);
                    if (!data.password) httpMsgs.show405(req, res);
                    console.log("Log:POST-getEmployeesIdPOST"); 
                    emp.getEmployeesIdPOST(req, res, data.id, data.password);
                });
            } else if (req.url === "/product") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    console.log(data.barcode.toString()); 
                    if (!data.barcode) httpMsgs.show405(req, res);
                    console.log("Log:POST-getEmployeesIdPOST"); 
                    emp.getProductBarcodePOST(req, res, data.barcode);
                });
            } else {
                httpMsgs.show404(req, res);
            }
            break;
        case "PUT":
            ////POST request should have request body
            if (req.url === "/employees") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data.id.toString()); 
                    //console.log(data.password.toString()); 
                    if (!data.id) httpMsgs.show405(req, res);
                    if (!data.password) httpMsgs.show405(req, res);
                    //res.writeHead(200, {'Content-Type':'text/html'});
                    console.log("Log:PUT-getEmployeesPasswordPUT"); 
                    emp.getEmployeesPasswordPUT(req, res, data.id, data.password);
                });

                /*
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) { //10 MB
                        httpMsgs.show413(req, res);
                    }
                });
                req.on("end", function () {
                    emp.update(req, res, reqBody);
                });
                */

            } else {
                httpMsgs.show404(req, res);
            }
            break;
        case "DELETE":
            ////POST request should have request body
            if (req.url === "/employees") {
                
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) { //10 MB
                        httpMsgs.show413(req, res);
                    }
                });
                req.on("end", function () {
                    emp.delete(req, res, reqBody);
                });
                
                           
            } else {
                httpMsgs.show404(req, res);
            }
            break;
        default:
            httpMsgs.show404(req, res);
            break;

    }







}).listen(settings.webport , function () {
    console.log("server listening on "+ settings.webport);
});