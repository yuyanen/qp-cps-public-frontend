import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import * as cnst from '../constants';
import { SessionTimeoutDialogComponent } from '../session-timeout/session-timeout-dialog/session-timeout-dialog.component';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class SessionTimeoutService {

    private timer: Observable<any>;
    private timerSubs: Subscription;
    private interval: number = 1000; // one second
    public timeout: Subject<number> = new Subject<number>();
    private token: any;
    //new timer
    private _counter: number = -1;
    public activeModal: NgbActiveModal
    private timer2: Observable<any>;
    private timerSubs2: Subscription;
    private cToken: Observable<string>;
    private timeoutSec: any;

    constructor(
        private modalService: NgbModal,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.authenticationService.currentUser.subscribe((user: any) => {
            if (user != undefined && user != null) {
                this.startTimer();
            }
        });

    }

    private setSubscription() {
        this.timer = timer(this.interval);
        this.timerSubs = this.timer.subscribe(n => {
            let timeRemainingInSec = this.getTimeRemainingInSec();
            if (timeRemainingInSec <= 0) {
                this.timerComplete(cnst.SESSION_EXPIRED);
                this.stopTimer();
            } else if (timeRemainingInSec <= cnst.COUNTDOWN_INIT_SEC) {
                this.timerComplete(cnst.SESSION_EXPIRING);
                this.stopTimer();
            } else {
                this.timerSubs.unsubscribe();
                this.setSubscription();
            }
        });
    }

    public startCounter() {
        if (this.timerSubs2) {
            this.timerSubs2.unsubscribe();
        }
        this.timer2 = timer(0, 1000);
        this.timerSubs2 = this.timer2.subscribe(n => {
            this._counter = this.getTimeRemainingInSec();
            if (this._counter <= 0) {
                this.sessionExpired();
            }
        });
    }

    public getTimeRemainingInSec(): number {
        let currentTime: number = (new Date()).getTime() / 1000;
        let expiredTime = this.getJwtExpirationTime();
        return Math.trunc(expiredTime - currentTime);
    }

    private getJwtExpirationTime() {
        if (environment.appEnv == "DEV") {
            if (sessionStorage.getItem('Auth-Token')) {
                const jwtToken = sessionStorage.getItem('Auth-Token');
                const decodedToken = jwtHelper.decodeToken(jwtToken);
                return decodedToken.exp;
            }
        } else {
            if (this.token) {
                const decodedToken = jwtHelper.decodeToken(this.token);
                return decodedToken.exp;
            }
        }
    }

    public startTimer() {
        if (environment.appEnv != "DEV" && this.authenticationService.getCurrentUser != null) {
            this.authenticationService.getSessionTimeout().subscribe(res => {
                this.token = res;
            })

        }
        if (this.timerSubs) {
            this.stopTimer();
        }
        this.setSubscription();
    }

    private sessionExpired() {

        this.authenticationService.logout();

    }

    public stopTimer() {
        this.timerSubs.unsubscribe();
    }

    public resetTimer() {
        this.startTimer();
    }

    private timerComplete(n: number) {
        this.timeout.next(n);
    }

    public openSessionTimeoutDialog(status: number) {
        this.startCounter();
        const modalRef = this.modalService.open(SessionTimeoutDialogComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.data = { status: status };
        modalRef.result.then((result) => {
            if (result) {
                if (result == 'extend') {
                    this.authenticationService.extendCurrentSession().subscribe(data => {
                        this.resetTimer();
                    });
                } else if (result == 'logout') {
                    this.authenticationService.logout();
                } else if (result == 'returnHome') {
                    this.authenticationService.logout();
                }
            }
        });
    }
}
