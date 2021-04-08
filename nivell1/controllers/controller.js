"use strict";
exports.__esModule = true;
var car_1 = require("./../models/car");
var wheel_1 = require("./../models/wheel");
// let car: Car;
// window.addEventListener('load', (event) => {
//     document.getElementById("carForm")?.addEventListener("submit", validaCar);
// });
// function validaCar(e: Event) {
//     e.preventDefault();
//     createCar('1212SDS','SEAT','ROJO');
// }
function createCar(plate, brand, color) {
    var car = new car_1.Car(plate, color, brand);
    car.addWheel(new wheel_1.Wheel(2, "SEAT"));
    document.body.innerText = "CAR: PLATE: " + car.plate
        + " COLOR: " + car.color + " BRAND: " + brand
        + " WHEELS: " + JSON.stringify(car.wheels);
}
