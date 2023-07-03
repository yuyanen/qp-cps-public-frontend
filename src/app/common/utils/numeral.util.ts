import { Injectable } from '@angular/core';
import * as numeral from 'numeral';

@Injectable({
    providedIn: 'root'
})

export class NumeralUtil {

    public static THOUSAND_SEPARATOR_FORMAT = "0,0";
    public static SPECIAL_CHAR = /[!@#$%^&*()?":{}|<>-]/g;
    public static ALPHABET_CHAR = /[A-Za-z]/g;

    public static parseNumeric(value: string): number | null {
        if (value) {
            return numeral(value).value();
        } else {
            return null;
        }
    }

    public static add(val1: string, val2: string): number | null {
        if (val1 && val2) {
            return numeral(val1).add(numeral(val2).value()).value();
        } else {
            return null;
        }
    }

    public static addStrings(vals: string[]): number | null {
        let totals: any;
        for (let item of vals) {
            totals += item.replace(/,/g, '');
        }
        return totals
    }

    public static difference(val1: number | string, val2: number | string): number | null {
        if (val1 && val2) {
            return numeral(val1).difference(numeral(val2).value());
        } else {
            return null;
        }
    }

    public static compare(val1: number | string, val2: number | string): number | null {
        if (val1 && typeof val1 == 'string') {
            val1 = numeral(val1).value();
        }
        if (val2 && typeof val2 == 'string') {
            val2 = numeral(val2).value();
        }
        if (val1 && val2) {
            if (val1 > val2) {
                return 1;
            } else if (val1 < val2) {
                return -1;
            } else {
                return 0;
            }
        } else {
            return null;
        }
    }

    public static addComma(value: string) {
        let count = 0;
        let temp = '';

        for (let index = value.length - 1; index > -1; index--) {
            temp = value.charAt(index) + (count > 0 && count % 3 == 0 ? ',' : '') + temp;
            count++;
        }
        return temp;
    }

    public static zeroWhenNull(value): number {
        return value ? value : 0;
    }
}