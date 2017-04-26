﻿var db = require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var util = require('util');

//// modular approach
exports.getEmployeesAllGET = function (req, res) {
    db.executeSql("Select * from Employees", function (data,err) {
        if (err) {
            httpMsgs.show500(req, res, err);           
        } else {
            httpMsgs.sendJson(req, res, data);         
        }     
    });
};

exports.getEmployeesIdGET = function (req, res, id) {

    db.executeSql("Select ID, PassWord, FirstName, LastName, Email, DepartmentId from Employees Where id="+id, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);
        } else {
            if (data.length>0) {
                httpMsgs.sendJson(req, res, data);
            } else {
                httpMsgs.sendNoDataFound(req, res);
            }
        }
    });

};

exports.getEmployeesIdPOST = function (req, res, id, password) {
    db.executeSql("Select id, password from Employees Where id="+id+" And password="+password, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);
        } else {
            if (data.length>0) {
                //res.writeHead(200, {'Content-Type':'text/html'}); 
                httpMsgs.sendJson(req, res, data);
            } else {
                httpMsgs.show400(req, res);
                //httpMsgs.sendNoDataFound(req, res);
            }
        }
    });

};



// POST request. need request body
exports.getEmployeesPasswordPUT = function (req, res, id, password) {
    try {
        db.executeSql("Update Employees Set password="+password+" Where id="+id, function (data, err) {
            if (err) {
                httpMsgs.show500(req, res, err);
            } else {
                httpMsgs.send200(req, res);
            }
        });
    } catch (ex) {
        httpMsgs.show500(req, res, ex);
    }
};














// POST request. need request body
exports.update = function (req, res, reqbody) {
    try {
        if (!reqbody) throw new error("Input not valid");
        var data = JSON.parse(reqbody);
        if (data) {
            
            if (!data.Id) throw new Error("Id not provided");

            var sql = "UPDATE EMPLOYEES SET";
            
            var isDataProvided = false;
                                  
            if (data.FirstName) {
                sql += " FirstName='" + data.FirstName + "',";
                isDataProvided = true;
            };
            if (data.LasttName) {
                sql += " LastName='" + data.LastName + "',";
                isDataProvided = true;
            };
            if (data.Email) {
                sql += " Email='" + data.Email + "',";
                isDataProvided = true;
            };
            if (data.DepartmentId) {
                sql += " DepartmentId=" + data.DepartmentId + ",";
                isDataProvided = true;
            };

            sql = sql.slice(0, -1);//remove last comma
            sql += " WHERE ID="+data.Id
            
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                } else {
                    httpMsgs.send200(req, res);
                }
            });

        } else {
            throw new error("Input not valid");
        }

    } catch (ex) {
        httpMsgs.show500(req, res, ex);
    }
};

// POST request. All POST request need request body
exports.add = function (req, res, reqbody) {
    try {
        if (!reqbody) throw new error("Input not valid");
        var data = JSON.parse(reqbody);
        if (data) {
            var sql = "INSERT INTO EMPLOYEES (FirstName, LastName, Email, DepartmentId) VALUES ";
            sql += util.format("('%s','%s','%s',%d)", data.FirstName, data.LastName, data.Email, data.DepartmentId);

            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                } else {
                    httpMsgs.send200(req, res);
                }
            });

        } else {
            throw new error("Input not valid");
        }

    } catch (ex) {
        httpMsgs.show500(req, res, err);
    }

};



// POST request. need request body
exports.delete = function (req, res, reqbody) {
    try {
        if (!reqbody) throw new error("Input not valid");
        var data = JSON.parse(reqbody);
        if (data) {
            
            if (!data.Id) throw new Error("Id not provided");
            
            var sql = "DELETE FROM EMPLOYEES";           
            
            sql += " WHERE ID=" + data.Id
            
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                } else {
                    httpMsgs.send200(req, res);
                }
            });

        } else {
            throw new error("Input not valid");
        }

    } catch (ex) {
        httpMsgs.show500(req, res, ex);
    }

};