import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { UntypedFormGroup } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class DateUtil {

    public static DATETIME_FORMAT = "DD-MMM-YYYY HH:mm:ss";
    public static TIME_FORMAT = "HH:mm:ss";
    public static DATE_FORMAT = "DD-MMM-YYYY";
    public static REPORT_DATE_FORMAT = "YYYYMMDD";

    public static parseDate(value: string): moment.Moment {
        if (value) {
            return moment(value, DateUtil.DATE_FORMAT);
        } else {
            return null;
        }
    }

    public static parseDateTime(value: string): moment.Moment {
        if (value) {
            return moment(value, DateUtil.DATETIME_FORMAT);
        } else {
            return null;
        }
    }

    public static parseTime(value: string): moment.Moment {
        if (value) {
            return moment(value, DateUtil.TIME_FORMAT);
        } else {
            return null;
        }
    }

    public static getNow(): moment.Moment {
        return moment().startOf('day');
    }

    public static getNowAsStartOfDay(): moment.Moment {
        return moment().startOf('day');
    }

    public static differenceInDay(date1: moment.Moment, date2: moment.Moment) {
        return date2.diff(date1, 'day', false);
    }

    isMoreThanXdaysLate(date: any, x: number) {
        if (DateUtil.differenceInDay(DateUtil.parseDate(date), DateUtil.getNow()) > x) {
            return true;
        } else {
            return false;
        }
    }
    plusDays(date: any, x: number) {
        if (DateUtil.parseDate(date)) {
            return DateUtil.parseDate(date).add(x, 'day');
        }
        return date;
    }

    public static plusMonths(date: any, x: number) {
        if (DateUtil.parseDate(date)) {
            return DateUtil.parseDate(date).add(x, 'months');
        }
        return date;
    }

    public static isDateTimeBefore(form: UntypedFormGroup, firstDate, secondDate) {
        if ((new Date(form.get(firstDate).value)).getTime() > (new Date(form.get(secondDate).value)).getTime()) {
            form.get(firstDate).setErrors({ 'dateLessThan': true });
        } else {
            form.get(firstDate).setErrors(null);
        }
        return form.patchValue(form);
    }

    public static isDateBefore(form: UntypedFormGroup, firstDate, secondDate) {
        if ((new Date(form.get(firstDate).value)) > (new Date(form.get(secondDate).value))) {
            form.get(firstDate).setErrors({ 'dateLessThan': true });
        } else {
            form.get(firstDate).setErrors(null);
        }
        return form.patchValue(form);
    }

}
