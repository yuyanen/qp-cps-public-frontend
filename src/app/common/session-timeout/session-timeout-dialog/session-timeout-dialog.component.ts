import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, timer } from 'rxjs';
import * as cnst from '../../constants';
import { AuthenticationService } from '../../services/authentication.service';
import { SessionTimeoutService } from '../../services/session-timeout.service';

@Component({
    selector: 'app-session-timeout-dialog',
    templateUrl: './session-timeout-dialog.component.html',
    styleUrls: ['./session-timeout-dialog.component.scss']
})
export class SessionTimeoutDialogComponent implements OnInit {

    @Input() data: any;

    private _timerSubs: Subscription;
    private _timer: Observable<number>;
    public _counter: number = -1;

    constructor(
        private authenticationService: AuthenticationService,
        public activeModal: NgbActiveModal,
        private sessionTimeoutService: SessionTimeoutService
    ) { }

    ngOnInit(): void {
        if (this.data.status === cnst.SESSION_EXPIRING) {
            this.startCounter();
        } 
    }

    ngOnDestroy() {
        if (this._timerSubs) {
            this._timerSubs.unsubscribe();
        }
    }

    public startCounter() {
        if (this._timerSubs) {
            this._timerSubs.unsubscribe();
        }

        this._timer = timer(0, 1000);
        this._timerSubs = this._timer.subscribe(n => {
            this._counter = this.sessionTimeoutService.getTimeRemainingInSec();
            if (this._counter <= 0) {
                this.sessionExpired();
            }       
        });
    }

    private sessionExpired() {
        this._timerSubs.unsubscribe();
    }

}
