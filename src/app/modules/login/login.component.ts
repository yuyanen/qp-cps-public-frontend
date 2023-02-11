import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../common/services/authentication.service';
import { ErrorDialogService } from '../../common/services/errordialog.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginId: string = '';
    password: string = '';

    error: string = '';
    userList: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private errorService: ErrorDialogService,
    ) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
    }

    directLogin() {
        this.error = '';
        if (!this.loginId || this.loginId.trim() === '') {
            this.error = 'Login ID is mandatory.';
        } else {
            this.authenticationService.logout();
            this.storeLoginReturnUrl();
            this.authenticationService.directLogin(this.loginId, this.password).pipe(first()).subscribe(authResponse => {
                this.processAuthResponse(authResponse);
            }, error => {
                this.error = error.message;
            });
        }
    }

    private storeLoginReturnUrl() {
        let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
        sessionStorage.setItem("loginReturnUrl", returnUrl);
    }

    private processAuthResponse(authResponse: any) {
        if (authResponse.auth) {

           
                    this.router.navigate([sessionStorage.getItem("loginReturnUrl")]);
              

        } else {
            this.error = authResponse.reason;
        }
    }
}
