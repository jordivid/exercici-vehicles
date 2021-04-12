import { Wheel } from "./wheel";

export class Car{
    public plate:string;
    public color:string;
    public brand:string;
    public wheels:Wheel[]=new Array();
    
    constructor(plate:string,color:string,brand:string){
        this.plate=plate;
        this.color=color;
        this.brand=brand;
    }
    
    public addWheel(wheel:Wheel):void{
        this.wheels.push(wheel);
    }

    public htmlCode(wheelData: string) : string {
        let code: string = `
        <section class="container mt-3 pt-2 pb-2 sectionCarData animate__animated animate__bounceInRight">
            <h5 class="font-weight-bold">Cotxe</h5>
            <div class="row">
                <div class="col-6 col-md-3 d-flex w-100 overflow-auto">
                <span class="font-weight-bold mr-1">Matrícula:</span>
                <span class="text-break">${ this.plate }</span>
                </div>
                <div class="col-6 col-md-3 d-flex w-100 overflow-auto">
                <span class="font-weight-bold mr-1">Marca:</span>
                <span class="text-break">${ this.brand }</span>
                </div>
                <div class="col-12 col-md-3 d-flex w-100 overflow-auto">
                <span class="font-weight-bold mr-1">Color:</span>
                <span class="text-break">${ this.color }</span>
                </div>
            </div>
            <hr>
            <h5 class="font-weight-bold">Rodes</h5>
            <div class="row">
                ${ wheelData }
            </div>
        </section>
        `;

        return code;
    }

    public validate() : boolean | string {
        let errorText: string = "";
        let success: boolean = true;
        let platePattern = /^[0-9]{4}[A-Z]{3}$/;

        if (this.plate.match(platePattern) === null) {
            errorText = "La matrícula ha de tenir 4 dígits i 3 lletres majúscules";
            success = false;
        }
        if (this.brand === "") {
            if (errorText !== "") {
                errorText +="\n";
            } 
            errorText += "La marca és obligatòria";
            success = false;
        }
        if (this.color === "") {
            if (errorText !== "") {
                errorText +="\n";
            } 
            errorText += "El color és obligatori";
            success = false;
        }

        if(success) {
            return success;
        } else {
            return errorText;
        }
    }
}