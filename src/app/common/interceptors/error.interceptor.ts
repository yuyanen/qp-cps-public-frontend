import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorDialogService } from '../services/errordialog.service'
import * as cnst from '../constants'
import { AuthenticationService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private errorDialogService: ErrorDialogService,
        private authenticationService: AuthenticationService,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {
                    reason: error && error.error.message ? error.error.message : cnst.Messages.ERR_MSG_GENERIC,
                    status: error.error.code
                };
                if (error.status === cnst.HttpStatus.UNAUTHORIZED) {
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    this.errorDialogService.openDialog(data);

                } else if (error.status === cnst.HttpStatus.CONFLICT) {
                    // did not do auto-refresh because user may want to know what he has updated
                    data = {
                        reason: 'The record(s) you are updating is outdated. Please refresh the page and try again.',
                        status: error.status
                    };
                    this.errorDialogService.openDialog(data);

                } else if (error.status !== cnst.HttpStatus.UNAVAILABLE && cnst.showDebugError) {
                    // show msg error except for 503 as it is a temporary state (i.e. payment response)
                    this.errorDialogService.openDialog(data);
                }
                return throwError(error);
            }));
    }
}
