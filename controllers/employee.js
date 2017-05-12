var db = require('../core/db');
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

exports.getWarrantyCodeAllGET = function (req, res) {
    db.executeSql("select WarrantyCode as Spinner from WarrantyCode", function (data,err) {
        if (err) {
            httpMsgs.show500(req, res, err);           
        } else {
            httpMsgs.sendJson(req, res, data);         
        }     
    });
};

exports.getCorporationInfoAllGET = function (req, res) {
    db.executeSql("select Code+':'+Name as Spinner from CorporationInfo", function (data,err) {
        if (err) {
            httpMsgs.show500(req, res, err);           
        } else {
            httpMsgs.sendJson(req, res, data);         
        }     
    });
};

exports.getServiceCenterAllGET = function (req, res) {
    db.executeSql("select Code+':'+Name as Spinner  from ServiceCenter", function (data,err) {
        if (err) {
            httpMsgs.show500(req, res, err);           
        } else {
            httpMsgs.sendJson(req, res, data);         
        }     
    });
};

exports.getEmployeesIdPOST = function (req, res, id, password) {
    db.executeSql("Select id, password, '0003:CorporationInfo0003' as CorporationInfo, '0002:ServiceCenter0002' as ServiceCenter from Employees Where id="+id+" And password="+password, function (data, err) {
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

exports.getProductBarcodePOST = function (req, res, barcode) {

    db.executeSql("Select FirstName as UserSpec, LastName as UserSpecName, Email as ModelName, ID as Customer from Employees Where FirstName='"+barcode+"'", function (data, err) {
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

exports.getWarrantyPOST = function (req, res, id, date) {
    db.executeSql("Select Barcode, Id, WarrantyType, WarrantyDate from Warranty Where id='"+id+"' And convert(varchar, SDate, 112)='"+date+"'", function (data, err) {
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
exports.getEmployeesPUT = function (req, res, barcode, id, warrantyCode, warrantyDate) {
    try {
        db.executeSql("Insert into Warranty (Barcode,Id,WarrantyType,WarrantyDate) Values('"+barcode+"','"+id+"','"+warrantyCode+"','"+warrantyDate+"')", function (data, err) {
            if (err) {
                httpMsgs.show500(req, res, err);
            } else {
                httpMsgs.sendNoDataFound(req, res);
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