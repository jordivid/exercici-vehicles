"use strict";
exports.__esModule = true;
exports.Car = void 0;
var Car = /** @class */ (function () {
    function Car(plate, color, brand) {
        this.wheels = new Array();
        this.plate = plate;
        this.color = color;
        this.brand = brand;
    }
    Car.prototype.addWheel = function (wheel) {
        this.wheels.push(wheel);
    };
    Car.prototype.htmlCode = function (wheelData) {
        var code = "\n        <section class=\"container mt-3 pt-2 pb-2 sectionCarData animate__animated animate__bounceInRight\">\n            <h5 class=\"font-weight-bold\">Cotxe</h5>\n            <div class=\"row\">\n                <div class=\"col-6 col-md-3 d-flex w-100 overflow-auto\">\n                <span class=\"font-weight-bold mr-1\">Matr\u00EDcula:</span>\n                <span class=\"text-break\">" + this.plate + "</span>\n                </div>\n                <div class=\"col-6 col-md-3 d-flex w-100 overflow-auto\">\n                <span class=\"font-weight-bold mr-1\">Marca:</span>\n                <span class=\"text-break\">" + this.brand + "</span>\n                </div>\n                <div class=\"col-12 col-md-3 d-flex w-100 overflow-auto\">\n                <span class=\"font-weight-bold mr-1\">Color:</span>\n                <span class=\"text-break\">" + this.color + "</span>\n                </div>\n            </div>\n            <hr>\n            <h5 class=\"font-weight-bold\">Rodes</h5>\n            <div class=\"row\">\n                " + wheelData + "\n            </div>\n        </section>\n        ";
        return code;
    };
    Car.prototype.validate = function () {
        var errorText = "";
        var success = true;
        var platePattern = /^[0-9]{4}[A-Z]{3}$/;
        if (this.plate.match(platePattern) === null) {
            errorText = "La matrícula ha de tenir 4 dígits i 3 lletres majúscules";
            success = false;
        }
        if (this.brand === "") {
            if (errorText !== "") {
                errorText += "\n";
            }
            errorText += "La marca és obligatòria";
            success = false;
        }
        if (this.color === "") {
            if (errorText !== "") {
                errorText += "\n";
            }
            errorText += "El color és obligatori";
            success = false;
        }
        if (success) {
            return success;
        }
        else {
            return errorText;
        }
    };
    return Car;
}());
exports.Car = Car;
