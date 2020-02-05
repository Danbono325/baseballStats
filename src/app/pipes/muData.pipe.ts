import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'muDate'})
export class MuDate implements PipeTransform {
  transform(value: Date): string {
    let strDate =  value.toString();

   
    let date = strDate.split('T', 1);
    let split = date[0].split('-', 3);
    console.log('SPLIT: ', split);
    var finalDate= "";
    switch(split[1]) {
        case "01":
            finalDate+="Jan ";
            break;
        case "02":
            finalDate+="Feb ";
            break;
        case "03":
            finalDate+="Mar ";
            break;
        case "04":
            finalDate+="Apr ";
            break;
        case "05":
            finalDate+="May ";
            break;
        case "06":
            finalDate+="Jun ";
            break;
        case "07":
            finalDate+="Jul ";
            break;
        case "08":
            finalDate+="Aug ";
            break;
        case "09":
            finalDate+="Sep ";
            break;
        case "10":
            finalDate+="Oct ";
            break;
        case "11":
            finalDate+="Nov ";
            break;
        case "12":
            finalDate+="Dec ";
            break;
        default:
            break;
    }

    if(split[2].substring(0,1) == "0"){
        split[2] = split[2].substring(1);
    }

    finalDate+=split[2] +", " + split[0];
    return finalDate;
  }
}