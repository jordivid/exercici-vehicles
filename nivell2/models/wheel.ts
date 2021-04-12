export class Wheel{
    public diameter:number;
    public brand:string;

    constructor(diameter:number, brand:string){
        this.diameter=diameter;
        this.brand=brand;
    }

    public htmlCode(numero: number): string {
        let code: string = `
            <div class="col-6 col-md-3 mb-1">
                <div class="d-flex flex-column p-1 wheelData">
                <h6 class="font-weight-bold">Roda ${ numero }</h6>
                <div class="d-flex">
                    <span class="font-weight-bold mr-1">Marca:</span>
                    <span class="text-break">${ this.brand }</span>
                </div>
                <div class="d-flex">
                    <span class="font-weight-bold mr-1">Diàmetre:</span>
                    <span>${ this.diameter }</span>
                </div>
            </div>
        </div>
        `;

        return code;
    }

    public validate(numero: number) : boolean | string {
        let errorText: string = "";
        let success: boolean = true;

        if (this.brand === "") {
            errorText = `Introdueix marca de la roda ${ numero }`;
            success = false;
        }
        if  ((isNaN(this.diameter)) ||  (this.diameter < 0.4 || this.diameter > 2)) {
            if (errorText !== "") {
                errorText +="\n";
            }
            errorText += `El diàmetre de la roda ${ numero } és incorrecte`;
            success = false;
        }

        if(success) {
            return success;
        } else {
            return errorText;
        }
    }

}