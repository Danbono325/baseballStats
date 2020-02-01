import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pitchType'})
export class PitchType implements PipeTransform {
  transform(value: number): string {
    switch(value) {
        case 0:
            return '4 Seam Fastball';
        case 1:
            return 'Cut Fastball';
        case 3:
            return 'Curveball';
        case 4:
            return 'Slider';
        case 5:
            return '2 Seam Fastball';
        case 6:
            return 'Changeup';
        default:
            return 'N/A';
    }
  }
}