"use strict";
exports.__esModule = true;
exports.Validator = void 0;
var Validator = /** @class */ (function () {
    function Validator() {
        this.status = "success";
        this.messages = new Array();
    }
    Validator.prototype.addError = function (error) {
        this.messages.push(error);
    };
    return Validator;
}());
exports.Validator = Validator;
