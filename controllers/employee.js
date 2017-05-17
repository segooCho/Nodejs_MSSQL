var db = require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var util = require('util');

//// modular approach
exports.getLogin = function (req, res, userId, password) {
    db.executeSql("EXEC SP_APP_USER_LOGIN_REV1 '"+userId+"','"+password+"'", function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);
        } else {
            if (data.length>0) {
                httpMsgs.sendJson(req, res, data);
            } else {
                httpMsgs.show400(req, res);
            }
        }
    });
};

exports.getCommomSpinner = function (req, res, mode, param1) {
    db.executeSql("EXEC SP_APP_COMMON_SPINNER_REV1 '"+mode+"','"+param1+"'", function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);
        } else {
            if (data.length>0) {
                httpMsgs.sendJson(req, res, data);
            } else {
                httpMsgs.show400(req, res);
            }
        }
    });
};

exports.getBarcode = function (req, res, barcode, id) {
    db.executeSql("EXEC SP_APP_SERIAL_SELECT_REV1 '"+barcode+"', '" + id + "'", function (data, err) {
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

exports.getExpiryDate = function (req, res, warrantyCode, goingOutDate) {
    db.executeSql("EXEC SP_APP_EXPIRYDATE_SELECT_REV1 '"+warrantyCode+"', '" + goingOutDate + "'", function (data, err) {
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

exports.updateBarcodeSave = function (  req
                                        ,res 
                                        ,serialNo
                                        ,userSpec
                                        ,goingOutDate
                                        ,warrantyCode
                                        ,buyer
                                        ,serviceCenter
                                        ,description
                                        ,fileName1
                                        ,filePath1
                                        ,fileName2
                                        ,filePath2
                                        ,createdBy) {
    try {
        db.executeSql("EXEC SP_APP_WARRANTY_INSERT_REV1 '"+serialNo+
                                                        "','"+userSpec+
                                                        "','"+goingOutDate+
                                                        "','"+warrantyCode+
                                                        "','"+buyer+
                                                        "','"+serviceCenter+
                                                        "','"+description+
                                                        "','"+fileName1+
                                                        "','"+filePath1+
                                                        "','"+fileName2+
                                                        "','"+filePath2+
                                                        "','"+createdBy+
                                                        "'", function (data, err) {
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
    } catch (ex) {
        httpMsgs.show500(req, res, ex);
    }
};

exports.getWorkList = function (req, res, regDate, userId) {
    db.executeSql("EXEC SP_APP_WARRANTYSAVE_SELECT_REV1 '"+regDate+"','"+userId+"'", function (data, err) {
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

