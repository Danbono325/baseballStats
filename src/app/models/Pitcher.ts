export class Pitcher {
    name: string;
    throws : string;
    id: number;
    height: string;
    age: number;

    constructor(name: string, throws: number, id:number, height: number, dob: Date) {
        this.name = name;
        this.height = this.makeHeight(height);
        if(throws == 1) {
            this.throws = "LH";
        }
        else {
            this.throws = "RH";
        }
        this.id= id;

        this.age = this.getAge(dob);
    }

    makeHeight(height) {
        let feet = Math.floor(height/12);
        let inches = height % 12;

        return feet + "'"+ inches + "\"";
    }

    getAge(dob) {
        // return 1;
        var timeDiff = Math.abs(Date.now() - new Date(dob).getTime());
        return(Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25));
        // return 1;
    }
} 