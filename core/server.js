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
                    //console.log(data);
                    if (!data.userId) httpMsgs.show405(req, res);
                    if (!data.password) httpMsgs.show405(req, res);
                    console.log("Log:POST-getLogin"); 
                    emp.getLogin(req, res, data.userId, data.password);
                });
            } else if (req.url === "/commonSpinner") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data); 
                    if (!data.mode) httpMsgs.show405(req, res);
                    //param1 이 없는 경우도 있음 오류
                    //if (!data.param1) httpMsgs.show405(req, res); 
                    console.log("Log:POST-getCommomSpinner"); 
                    emp.getCommomSpinner(req, res, data.mode, data.param1);
                });
            } else if (req.url === "/barcode") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data); 
                    if (!data.barcode) httpMsgs.show405(req, res);
                    if (!data.id) httpMsgs.show405(req, res);
                    console.log("Log:POST-getBarcode"); 
                    emp.getBarcode(req, res, data.barcode, data.id);
                });
            } else if (req.url === "/expiryDate") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data); 
                    if (!data.warrantyCode) httpMsgs.show405(req, res);
                    if (!data.goingOutDate) httpMsgs.show405(req, res);
                    console.log("Log:POST-getExpiryDate"); 
                    emp.getExpiryDate(req, res, data.warrantyCode, data.goingOutDate);
                });
            } else if (req.url === "/workList") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data); 
                    if (!data.mode) httpMsgs.show405(req, res);
                    if (!data.date) httpMsgs.show405(req, res);
                    if (!data.userId) httpMsgs.show405(req, res);
                    console.log("Log:POST-getWorkList"); 
                    emp.getWorkList(req, res, data.mode, data.date, data.userId);
                });
            } else {
                httpMsgs.show404(req, res);
            }
            break;
        case "PUT":
            ////POST request should have request body
            if (req.url === "/barcodeSave") {
                req.on('data', function(params) { 
                    var data = querystring.parse(params.toString());
                    //console.log(data); 
                    if (!data.serialNo) httpMsgs.show405(req, res);
                    if (!data.userSpec) httpMsgs.show405(req, res);
                    if (!data.goingOutDate) httpMsgs.show405(req, res);
                    if (!data.warrantyCode) httpMsgs.show405(req, res);
                    if (!data.buyer) httpMsgs.show405(req, res);
                    if (!data.serviceCenter) httpMsgs.show405(req, res);
                    if (!data.createdBy) httpMsgs.show405(req, res);
                    console.log("Log:PUT-updateBarcodeSave"); 
                    emp.updateBarcodeSave(  req 
                                            ,res
                                            ,data.serialNo
                                            ,data.userSpec
                                            ,data.goingOutDate
                                            ,data.warrantyCode
                                            ,data.buyer
                                            ,data.serviceCenter
                                            ,data.description
                                            ,data.fileName1
                                            ,data.filePath1
                                            ,data.fileName2
                                            ,data.filePath2
                                            ,data.createdBy);
                });
            } else {
                httpMsgs.show404(req, res);
            }
            break;
    }







}).listen(settings.webport , function () {
    console.log("server listening on "+ settings.webport);
});