import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as cnst from '../constants';
import { SessionTimeoutService } from '../services/session-timeout.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    cnst = cnst;

    constructor(
        private sessionTimeoutService: SessionTimeoutService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (sessionStorage.getItem('Auth-Token')) {
            request = request.clone({
                setHeaders: {
                    "App-Authorization": 'Bearer ' + sessionStorage.getItem('Auth-Token')
                },
            });
        }

        return next.handle(request).pipe(map(response => {
            if (environment.appEnv !== cnst.Environments.PROD && environment.appEnv !== cnst.Environments.UAT) {
                if (response instanceof HttpResponse) {
                    if (response.headers.get('X-Auth-Token')) {
                        sessionStorage.setItem('Auth-Token', response.headers.get('X-Auth-Token'));
                    }
                    this.sessionTimeoutService.resetTimer();
                }
            }
            return response;
        }));

    }
}