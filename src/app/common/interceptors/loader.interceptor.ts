import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

    requestCount: number = 0;

    constructor(private loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requestCount++;
        this.showLoader();
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.onEnd();
            }
        },
            (err: any) => {
                this.onEnd();
            }));
    }
    private onEnd(): void {
        this.requestCount--;
        if (this.requestCount === 0) {
            this.hideLoader();
        }
    }
    private showLoader(): void {
        this.loaderService.show();
    }
    private hideLoader(): void {
        this.loaderService.hide();
    }
}