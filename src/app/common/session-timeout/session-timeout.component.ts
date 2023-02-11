import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as cnst from '../constants';
import { SessionTimeoutService } from '../services/session-timeout.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-session-timeout',
    templateUrl: './session-timeout.component.html',
    styleUrls: ['./session-timeout.component.scss']
})
export class SessionTimeoutComponent implements OnDestroy {

    private sessionTimerSubs: Subscription = new Subscription();

    constructor(
        private sessionTimeoutService: SessionTimeoutService,
        private authenticationService: AuthenticationService,
    ) {
        this.init();
    }

    ngOnDestroy(): void {
        this.sessionTimerSubs.unsubscribe();
    }

    init() {
        this.setTimeoutSubscription();
    }

    private setTimeoutSubscription() {
        this.sessionTimerSubs = this.sessionTimeoutService.timeout.subscribe(res => {
            if (res === cnst.SESSION_EXPIRED) {
                this.sessionTimeoutService.openSessionTimeoutDialog(cnst.SESSION_EXPIRED);
            } else {
                this.sessionTimeoutService.openSessionTimeoutDialog(cnst.SESSION_EXPIRING);
            }
        });
    }

}
