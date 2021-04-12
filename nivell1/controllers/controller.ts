import { Car } from "./../models/car";
import { Wheel } from "./../models/wheel";

let car: Car;

window.addEventListener('load', (event) => {
    document.getElementById("carForm")?.addEventListener("submit", createCar);
    document.getElementById("wheelsForm")?.addEventListener("submit", createWheels);
    document.getElementById("btBack")?.addEventListener("click", retrocedir);
});

function createCar(e: Event) {
    // Fabricació de l'estructura del cotxe
    e.preventDefault();
    let marcar1: HTMLInputElement = <HTMLInputElement>document.getElementById("marcar1");
    let seccioCotxe: HTMLElement = <HTMLElement>document.getElementById("sectionCar");
    let seccioRodes: HTMLElement = <HTMLElement>document.getElementById("sectionWheels");
    let plate: string = (<HTMLInputElement>document.getElementById("plate")).value;
    let brand: string = (<HTMLInputElement>document.getElementById("brand")).value;
    let color: string = (<HTMLInputElement>document.getElementById("color")).value;
    let result: boolean | string;
    
    car=new Car(plate,color,brand);
    result = car.validate();
    if (typeof result === "string") {
        alert(result);
        return;
    }

    seccioCotxe.style.display = "none";
    seccioRodes.style.display = "block";
    marcar1.focus();
}

function createWheels(e: Event){
    // Muntatge de les rodes.
    // Únicament es munten si totes son correctes.
    e.preventDefault();
    let marcar1: string = (<HTMLInputElement>document.getElementById("marcar1")).value.trim();
    let diametrer1: number = parseFloat((<HTMLInputElement>document.getElementById("diametrer1")).value);
    let marcar2: string = (<HTMLInputElement>document.getElementById("marcar2")).value.trim();
    let diametrer2: number = parseFloat((<HTMLInputElement>document.getElementById("diametrer2")).value);
    let marcar3: string = (<HTMLInputElement>document.getElementById("marcar3")).value.trim();
    let diametrer3: number = parseFloat((<HTMLInputElement>document.getElementById("diametrer3")).value);
    let marcar4: string = (<HTMLInputElement>document.getElementById("marcar4")).value.trim();
    let diametrer4: number = parseFloat((<HTMLInputElement>document.getElementById("diametrer4")).value);
    let indx: number = 0;
    let success: boolean = true;
    let result: boolean | string;
    let errorText: string = "";
    let rodes: Wheel[] = new Array();
    
    rodes.push(new Wheel(diametrer1, marcar1));
    rodes.push(new Wheel(diametrer2, marcar2));
    rodes.push(new Wheel(diametrer3, marcar3));
    rodes.push(new Wheel(diametrer4, marcar4));
    for(let roda of rodes) {
        ++indx;
        result = roda.validate(indx);
        if (typeof result === "string") {
            success = false;
            if (indx > 1) {
                errorText += "\n" + result;
            } else {
                errorText += result;
            }
        }
    } 

    if (success) {
        for(let roda of rodes) {
            car.addWheel(roda);
        }
        buildCar();
    } else {
        alert(errorText);
    }
    
}

function buildCar() : void {
    // Construcció del codi html i addició al DOM
    let so: HTMLAudioElement = <HTMLAudioElement>document.getElementById("engegada");
    let seccioRodes: HTMLElement = <HTMLElement>document.getElementById("sectionWheels");
    let parking: HTMLElement = <HTMLElement>document.getElementById("carParking");
    let cotxe: string = "";
    let rodes: string = "";
    let arrayRodes: Wheel[] = car.wheels;
    let indx: number = 0;

    for(let roda of arrayRodes) {
        ++indx;
        rodes += roda.htmlCode(indx);
    }

    cotxe = car.htmlCode(rodes);
    seccioRodes.style.display = "none";
    parking.insertAdjacentHTML("beforeend", cotxe);
    so.play();
}

function retrocedir() : void {
    let seccioCotxe: HTMLElement = <HTMLElement>document.getElementById("sectionCar");
    let seccioRodes: HTMLElement = <HTMLElement>document.getElementById("sectionWheels");
    seccioRodes.style.display = "none";
    seccioCotxe.style.display = "block";

    (<HTMLInputElement>document.getElementById("marcar1")).value = "";
    (<HTMLInputElement>document.getElementById("diametrer1")).value = "";
    (<HTMLInputElement>document.getElementById("marcar2")).value = "";
    (<HTMLInputElement>document.getElementById("diametrer2")).value = "";
    (<HTMLInputElement>document.getElementById("marcar3")).value = "";
    (<HTMLInputElement>document.getElementById("diametrer3")).value = "";
    (<HTMLInputElement>document.getElementById("marcar4")).value = "";
    (<HTMLInputElement>document.getElementById("diametrer4")).value = "";
}