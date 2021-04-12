// import { Car } from "./../models/car";
// import { Wheel } from "./../models/wheel";
/***************************** */
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
        var validador = new Validator();
        if (this.brand === "") {
            validador.addError(["marcar" + numero, "Introdueix marca de la roda " + numero]);
            validador.status = "failed";
        }
        if ((isNaN(this.diameter)) || (this.diameter < 0.4 || this.diameter > 2)) {
            validador.addError(["diametrer" + numero, "El di\u00E0metre de la roda " + numero + " \u00E9s incorrecte"]);
            validador.status = "failed";
        }
        return validador;
    };
    return Wheel;
}());
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
        var validador = new Validator();
        var platePattern = /^[0-9]{4}[A-Z]{3}$/;
        if (this.plate.match(platePattern) === null) {
            validador.addError(["plate", "La matrícula ha de tenir 4 dígits i 3 lletres majúscules"]);
            validador.status = "failed";
        }
        if (this.brand === "") {
            validador.addError(["brand", "La marca és obligatòria"]);
            validador.status = "failed";
        }
        if (this.color === "") {
            validador.addError(["color", "El color és obligatori"]);
            validador.status = "failed";
        }
        return validador;
    };
    return Car;
}());
/***************************** */
var car;
window.addEventListener('load', function (event) {
    var _a, _b, _c;
    (_a = document.getElementById("carForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", createCar);
    (_b = document.getElementById("wheelsForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", createWheels);
    (_c = document.getElementById("btBack")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", retrocedir);
});
function createCar(e) {
    // Fabricació de l'estructura del cotxe
    e.preventDefault();
    var marcar1 = document.getElementById("marcar1");
    var seccioCotxe = document.getElementById("sectionCar");
    var seccioRodes = document.getElementById("sectionWheels");
    var plate = document.getElementById("plate");
    var brand = document.getElementById("brand");
    var color = document.getElementById("color");
    var result;
    // S'elimina els errors d'una validació prèvia
    var errplate = document.getElementById("errplate");
    var errbrand = document.getElementById("errbrand");
    var errcolor = document.getElementById("errcolor");
    plate.classList.remove("is-invalid");
    brand.classList.remove("is-invalid");
    color.classList.remove("is-invalid");
    errplate.innerHTML = "";
    errbrand.innerHTML = "";
    errcolor.innerHTML = "";
    car = new Car(plate.value, color.value, brand.value);
    result = car.validate();
    if (result.status === "success") {
        seccioCotxe.style.display = "none";
        seccioRodes.style.display = "block";
        marcar1.focus();
    }
    else {
        paintErrors(result);
    }
}
function createWheels(e) {
    // Muntatge de les rodes.
    // Únicament es munten si totes son correctes.
    e.preventDefault();
    var marcar1 = document.getElementById("marcar1").value.trim();
    var diametrer1 = parseFloat(document.getElementById("diametrer1").value);
    var marcar2 = document.getElementById("marcar2").value.trim();
    var diametrer2 = parseFloat(document.getElementById("diametrer2").value);
    var marcar3 = document.getElementById("marcar3").value.trim();
    var diametrer3 = parseFloat(document.getElementById("diametrer3").value);
    var marcar4 = document.getElementById("marcar4").value.trim();
    var diametrer4 = parseFloat(document.getElementById("diametrer4").value);
    var indx = 0;
    var success = true;
    var result;
    var rodes = new Array();
    // S'elimina els errors d'una validació prèvia
    for (var i = 1; i < 5; i++) {
        var brand = document.getElementById("marcar" + i);
        var diameter = document.getElementById("diametrer" + i);
        var errbrand = document.getElementById("errmarcar" + i);
        var errdiameter = document.getElementById("errdiametrer" + i);
        brand.classList.remove("is-invalid");
        diameter.classList.remove("is-invalid");
        errbrand.innerHTML = "";
        errdiameter.innerHTML = "";
    }
    rodes.push(new Wheel(diametrer1, marcar1));
    rodes.push(new Wheel(diametrer2, marcar2));
    rodes.push(new Wheel(diametrer3, marcar3));
    rodes.push(new Wheel(diametrer4, marcar4));
    for (var _i = 0, rodes_1 = rodes; _i < rodes_1.length; _i++) {
        var roda = rodes_1[_i];
        ++indx;
        result = roda.validate(indx);
        if (result.status !== "success") {
            success = false;
            paintErrors(result);
        }
    }
    if (success) {
        for (var _a = 0, rodes_2 = rodes; _a < rodes_2.length; _a++) {
            var roda = rodes_2[_a];
            car.addWheel(roda);
        }
        buildCar();
    }
}
function paintErrors(validador) {
    for (var _i = 0, _a = validador.messages; _i < _a.length; _i++) {
        var message = _a[_i];
        var field = document.getElementById(message[0]);
        var errField = document.getElementById("err" + message[0]);
        field.classList.add("is-invalid");
        errField.innerHTML = message[1];
    }
}
function buildCar() {
    // Construcció del codi html i addició al DOM
    var so = document.getElementById("engegada");
    var seccioRodes = document.getElementById("sectionWheels");
    var parking = document.getElementById("carParking");
    var cotxe = "";
    var rodes = "";
    var arrayRodes = car.wheels;
    var indx = 0;
    for (var _i = 0, arrayRodes_1 = arrayRodes; _i < arrayRodes_1.length; _i++) {
        var roda = arrayRodes_1[_i];
        ++indx;
        rodes += roda.htmlCode(indx);
    }
    cotxe = car.htmlCode(rodes);
    seccioRodes.style.display = "none";
    parking.insertAdjacentHTML("beforeend", cotxe);
    so.play();
}
function retrocedir() {
    var seccioCotxe = document.getElementById("sectionCar");
    var seccioRodes = document.getElementById("sectionWheels");
    seccioRodes.style.display = "none";
    seccioCotxe.style.display = "block";
    document.getElementById("marcar1").value = "";
    document.getElementById("diametrer1").value = "";
    document.getElementById("marcar2").value = "";
    document.getElementById("diametrer2").value = "";
    document.getElementById("marcar3").value = "";
    document.getElementById("diametrer3").value = "";
    document.getElementById("marcar4").value = "";
    document.getElementById("diametrer4").value = "";
}
