import { Validator } from "./../models/validator";
import { Car } from "./../models/car";
import { Wheel } from "./../models/wheel";

let cars: Car[] = new Array();

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
    let plate: HTMLInputElement = <HTMLInputElement>document.getElementById("plate");
    let brand: HTMLInputElement = <HTMLInputElement>document.getElementById("brand");
    let color: HTMLInputElement = <HTMLInputElement>document.getElementById("color");
    let result: Validator;
    let car: Car;

    // S'elimina els errors d'una validació prèvia
    let errplate: HTMLElement = <HTMLElement>document.getElementById("errplate");
    let errbrand: HTMLElement = <HTMLElement>document.getElementById("errbrand");
    let errcolor: HTMLElement = <HTMLElement>document.getElementById("errcolor");

    plate.classList.remove("is-invalid");
    brand.classList.remove("is-invalid");
    color.classList.remove("is-invalid");
    errplate.innerHTML = "";
    errbrand.innerHTML = "";
    errcolor.innerHTML = "";

    // Es comprova que no existeixi un cotxe amb la mateixa matrícula
    if (Car.hasCar(plate.value, cars)) {
        plate.classList.add("is-invalid");
        errplate.innerHTML = "Ja existeix un cotxe amb aquesta matrícula";
        return;
    }
    
    car=new Car(plate.value,color.value,brand.value);
    result = car.validate();

    if (result.status === "success") {
        cars.push(car);
        seccioCotxe.style.display = "none";
        seccioRodes.style.display = "block";
        marcar1.focus();
    } else {
        paintErrors(result);
    }
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
    let result: Validator;
    let rodes: Wheel[] = new Array();
    let car: Car = cars[cars.length - 1];

    // S'elimina els errors d'una validació prèvia
    for(let i: number = 1; i < 5; i++) {
        let brand: HTMLInputElement = <HTMLInputElement>document.getElementById("marcar" + i);
        let diameter: HTMLInputElement = <HTMLInputElement>document.getElementById("diametrer" + i);
        let errbrand: HTMLElement = <HTMLElement>document.getElementById("errmarcar" + i);
        let errdiameter: HTMLElement = <HTMLElement>document.getElementById("errdiametrer" + i);
        brand.classList.remove("is-invalid");
        diameter.classList.remove("is-invalid");
        errbrand.innerHTML = "";
        errdiameter.innerHTML = "";
    }
    
    rodes.push(new Wheel(diametrer1, marcar1));
    rodes.push(new Wheel(diametrer2, marcar2));
    rodes.push(new Wheel(diametrer3, marcar3));
    rodes.push(new Wheel(diametrer4, marcar4));
    for(let roda of rodes) {
        ++indx;
        result = roda.validate(indx);
        if (result.status !== "success") {
            success = false;
            paintErrors(result);
        }
    } 

    if (success) {
        for(let roda of rodes) {
            car.addWheel(roda);
        }
        buildCar();
    }
    
}

function paintErrors(validador: Validator) : void {
    for(let message of validador.messages) {
        let field: HTMLInputElement = <HTMLInputElement>document.getElementById(message[0]);
        let errField: HTMLElement = <HTMLElement>document.getElementById("err" + message[0]);

        field.classList.add("is-invalid");
        errField.innerHTML = message[1];
    }
}

function buildCar() : void {
    // Construcció del codi html i addició al DOM
    let seccioCotxe: HTMLElement = <HTMLElement>document.getElementById("sectionCar");
    let so: HTMLAudioElement = <HTMLAudioElement>document.getElementById("engegada");
    let seccioRodes: HTMLElement = <HTMLElement>document.getElementById("sectionWheels");
    let parking: HTMLElement = <HTMLElement>document.getElementById("carParking");
    let cotxe: string = "";
    let rodes: string = "";
    let car: Car = cars[cars.length - 1];
    let arrayRodes: Wheel[] = car.wheels;
    let indx: number = 0;

    for(let roda of arrayRodes) {
        ++indx;
        rodes += roda.htmlCode(indx);
    }

    netejaFormCotxe();
    netejaFormRodes();
    seccioRodes.style.display = "none";
    seccioCotxe.style.display = "block";
    cotxe = car.htmlCode(rodes);
    parking.insertAdjacentHTML("beforeend", cotxe);
    so.play();
}

function retrocedir() : void {
    let seccioCotxe: HTMLElement = <HTMLElement>document.getElementById("sectionCar");
    let seccioRodes: HTMLElement = <HTMLElement>document.getElementById("sectionWheels");
    seccioRodes.style.display = "none";
    seccioCotxe.style.display = "block";

    netejaFormRodes();
    cars.pop();
}

function netejaFormCotxe() {
    (<HTMLInputElement>document.getElementById("plate")).value = "";
    (<HTMLInputElement>document.getElementById("brand")).value = "";
    (<HTMLInputElement>document.getElementById("color")).value = "";
}

function netejaFormRodes() {
    (<HTMLInputElement>document.getElementById("marcar1")).value = "";
    (<HTMLInputElement>document.getElementById("diametrer1")).value = "";
    (<HTMLInputElement>document.getElementById("marcar2")).value = "";
    (<HTMLInputElement>document.getElementById("diametrer2")).value = "";
    (<HTMLInputElement>document.getElementById("marcar3")).value = "";
    (<HTMLInputElement>document.getElementById("diametrer3")).value = "";
    (<HTMLInputElement>document.getElementById("marcar4")).value = "";
    (<HTMLInputElement>document.getElementById("diametrer4")).value = "";
}