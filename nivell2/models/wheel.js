"use strict";
exports.__esModule = true;
exports.Wheel = void 0;
var Wheel = /** @class */ (function () {
    function Wheel(diameter, brand) {
        this.diameter = diameter;
        this.brand = brand;
    }
    Wheel.prototype.htmlCode = function (numero) {
        var code = "\n            <div class=\"col-6 col-md-3 mb-1\">\n                <div class=\"d-flex flex-column p-1 wheelData\">\n                <h6 class=\"font-weight-bold\">Roda " + numero + "</h6>\n                <div class=\"d-flex\">\n                    <span class=\"font-weight-bold mr-1\">Marca:</span>\n                    <span class=\"text-break\">" + this.brand + "</span>\n                </div>\n                <div class=\"d-flex\">\n                    <span class=\"font-weight-bold mr-1\">Di\u00E0metre:</span>\n                    <span>" + this.diameter + "</span>\n                </div>\n            </div>\n        </div>\n        ";
        return code;
    };
    Wheel.prototype.validate = function (numero) {
        var errorText = "";
        var success = true;
        if (this.brand === "") {
            errorText = "Introdueix marca de la roda " + numero;
            success = false;
        }
        if ((isNaN(this.diameter)) || (this.diameter < 0.4 || this.diameter > 2)) {
            if (errorText !== "") {
                errorText += "\n";
            }
            errorText += "El di\u00E0metre de la roda " + numero + " \u00E9s incorrecte";
            success = false;
        }
        if (success) {
            return success;
        }
        else {
            return errorText;
        }
    };
    return Wheel;
}());
exports.Wheel = Wheel;
