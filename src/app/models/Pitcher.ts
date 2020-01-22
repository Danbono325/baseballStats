export class Pitcher {
    name: string;
    throws : string;
    id: number;

    constructor(name: string, throws: number, id:number) {
        this.name = name;
        if(throws == 1) {
            this.throws = "LH";
        }
        else {
            this.throws = "RH";
        }
        this.id= id;
    }
}