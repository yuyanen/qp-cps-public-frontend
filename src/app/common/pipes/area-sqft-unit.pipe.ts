import { Pipe, PipeTransform } from '@angular/core';
const SQUARE_FEET_CONVERSION = 10.7639;

@Pipe({
    name: 'areaSqFtUnit'
})
export class AreaSqFtUnitPipe implements PipeTransform {
    transform(size: number): string {
        if (size > 0) {
            size = (size * SQUARE_FEET_CONVERSION);
            return numberWithCommas(Math.floor(size)) + ' sqft';
        } else {
            return '0 sqft';
        }
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}