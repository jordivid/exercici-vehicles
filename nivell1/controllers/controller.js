"use strict";
exports.__esModule = true;
var car_1 = require("./../models/car");
var wheel_1 = require("./../models/wheel");
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
    var plate = document.getElementById("plate").value;
    var brand = document.getElementById("brand").value;
    var color = document.getElementById("color").value;
    var result;
    car = new car_1.Car(plate, color, brand);
    result = car.validate();
    if (typeof result === "string") {
        alert(result);
        return;
    }
    seccioCotxe.style.display = "none";
    seccioRodes.style.display = "block";
    marcar1.focus();
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
    var errorText = "";
    var rodes = new Array();
    rodes.push(new wheel_1.Wheel(diametrer1, marcar1));
    rodes.push(new wheel_1.Wheel(diametrer2, marcar2));
    rodes.push(new wheel_1.Wheel(diametrer3, marcar3));
    rodes.push(new wheel_1.Wheel(diametrer4, marcar4));
    for (var _i = 0, rodes_1 = rodes; _i < rodes_1.length; _i++) {
        var roda = rodes_1[_i];
        ++indx;
        result = roda.validate(indx);
        if (typeof result === "string") {
            success = false;
            if (indx > 1) {
                errorText += "\n" + result;
            }
            else {
                errorText += result;
            }
        }
    }
    if (success) {
        for (var _a = 0, rodes_2 = rodes; _a < rodes_2.length; _a++) {
            var roda = rodes_2[_a];
            car.addWheel(roda);
        }
        buildCar();
    }
    else {
        alert(errorText);
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
