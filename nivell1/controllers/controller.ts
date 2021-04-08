import { Car } from "./../models/car";
import { Wheel } from "./../models/wheel";

// let car: Car;

// window.addEventListener('load', (event) => {
//     document.getElementById("carForm")?.addEventListener("submit", validaCar);
// });

// function validaCar(e: Event) {
//     e.preventDefault();
//     createCar('1212SDS','SEAT','ROJO');
// }

function createCar(plate:string,brand:string,color:string){
    let car=new Car(plate,color,brand);
    car.addWheel(new Wheel(2,"SEAT"));
    document.body.innerText="CAR: PLATE: " + car.plate 
    + " COLOR: " +car.color + " BRAND: " + brand 
    + " WHEELS: " + JSON.stringify(car.wheels);
}
