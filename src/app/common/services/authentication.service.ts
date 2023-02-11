import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    directLogin(loginId: string, password: string) {
        return this.http.post<any>(environment.apiBaseUrl + '/users/authenticate', { loginId,password})
            .pipe(map(authResponse => {
                return this.login(authResponse);
            }));
    }


    private login(authResponse: any) {
        if (authResponse.user && authResponse.auth) {
            sessionStorage.setItem('currentUser', JSON.stringify(authResponse.user));
            this.currentUserSubject.next(authResponse.user);
        }
        return authResponse;
    }

    logout() {
        let sessionId = this.currentUserValue ? this.currentUserValue.sessionId : null;

        // remove user from local storage to log user out
        sessionStorage.removeItem('Auth-Token');
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('searchDto');
        sessionStorage.removeItem("loginReturnUrl");
        sessionStorage.removeItem("loginState");
        this.currentUserSubject.next(null);

    }
    getSessionTimeout(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/users/current/get-sessionTimeout', { responseType: 'text' });
    }

    getCurrentUser() {
        return this.http.get<any>(environment.apiBaseUrl + '/users/current');
    }

    getCurrentUserById() {
        return this.http.get<any>(environment.apiBaseUrl + '/users/current-user-by-id');
    }

    extendCurrentSession() {
        return this.http.post<any>(environment.apiBaseUrl + '/users/current/extend-session', {});
    }

    public checkIfGranted(roleCode: string) {
        if (!this.currentUserValue || !this.currentUserValue.roleCode) {
            return false;
        } else {
            return this.currentUserValue.roleCode === roleCode;
        }
    }

    isGranted(roleCode: string | string[]) {
        if (roleCode) {
            if (typeof roleCode == 'string') {
                return this.checkIfGranted(roleCode);
            } else {
                var result = false;
                roleCode.forEach(value => {
                    if (this.checkIfGranted(value)) {
                        result = true;
                    }
                });
                return result;
            }
        }
        return false;
    }

    
getProfile(): Observable<any> {  
    return this.http.get(environment.apiBaseUrl+"/users/profile")
  
  };
}
