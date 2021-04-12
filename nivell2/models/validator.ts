export class Validator{
    public status: string;
    public messages: string[][];

    constructor() {
        this.status = "success";
        this.messages = new Array();
    }

    addError(error: string[]) {
        this.messages.push(error);
    }
}