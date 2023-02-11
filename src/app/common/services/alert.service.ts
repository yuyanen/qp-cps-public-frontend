import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    _alert = new Subject<string>();
    _alertType = new Subject<string>();
    private alertType: string;

    show(text: string, type: string) {
        this._alert.next(text);
        this._alertType.next(type);
        this.alertType = type;
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    clear(type: string) {
        this._alert.next(null);
        this._alertType.next(type);
    }

    getAlertType = function () {
        return this.alertType;
    }
}