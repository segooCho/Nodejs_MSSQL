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
            } else {
                httpMsgs.show404(req, res);
            }
            break;
        case "POST":
            ////POST request should have request body
            if (req.url === "/") {
                httpMsgs.showHome(req, res);
            } else if (req.url === "/login") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data.id.toString()); 
                    //console.log(data.password.toString()); 
                    if (!data.id) httpMsgs.show405(req, res);
                    if (!data.password) httpMsgs.show405(req, res);
                    console.log("Log:POST-getLogin"); 
                    emp.getLogin(req, res, data.id, data.password);
                });
            } else if (req.url === "/commonSpinner") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    console.log(data.mode.toString()); 
                    console.log(data.param1.toString());  
                    if (!data.mode) httpMsgs.show405(req, res);
                    //if (!data.param1) httpMsgs.show405(req, res); //param1 이 업는 경우가 있어 오류 발생
                    console.log("Log:POST-getCommomSpinner"); 
                    emp.getCommomSpinner(req, res, data.mode, data.param1);
                });
            } else if (req.url === "/barcode") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data.barcode.toString()); 
                    //console.log(data.id.toString()); 
                    if (!data.barcode) httpMsgs.show405(req, res);
                    if (!data.id) httpMsgs.show405(req, res);
                    console.log("Log:POST-getBarcode"); 
                    emp.getBarcode(req, res, data.barcode, data.id);
                });








            } else if (req.url === "/warranty") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data.id.toString()); 
                    //console.log(data.date.toString()); 
                    if (!data.id) httpMsgs.show405(req, res);
                    if (!data.date) httpMsgs.show405(req, res);
                    console.log("Log:POST-getWarrantyPOST"); 
                    emp.getWarrantyPOST(req, res, data.id, data.date);
                });
            } else {
                httpMsgs.show404(req, res);
            }
            break;
        case "PUT":
            ////POST request should have request body
            if (req.url === "/product") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data.id.toString()); 
                    //console.log(data.password.toString()); 
                    if (!data.barcode) httpMsgs.show405(req, res);
                    if (!data.id) httpMsgs.show405(req, res);
                    if (!data.warrantyCode) httpMsgs.show405(req, res);
                    if (!data.warrantyDate) httpMsgs.show405(req, res);
                    //res.writeHead(200, {'Content-Type':'text/html'});
                    console.log("Log:PUT-getEmployeesPUT"); 
                    emp.getEmployeesPUT(req, res, data.barcode, data.id, data.warrantyCode, data.warrantyDate);
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