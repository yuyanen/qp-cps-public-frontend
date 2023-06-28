import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';

import { LoginComponent } from './modules/login/login.component';
import { ErrorDialogComponent } from './common/modules/error-dialog/error-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import these modules
import { HomeComponent } from './modules/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { ErrorDialogService } from './common/services/errordialog.service';
import { LoaderComponent } from './common/modules/loader/loader.component';
import { ErrorInterceptor, JwtInterceptor, LoaderInterceptor } from './common/interceptors';
import { SessionTimeoutDialogComponent } from './common/session-timeout/session-timeout-dialog/session-timeout-dialog.component';
import { SessionTimeoutComponent } from './common/session-timeout/session-timeout.component';
import {MainNavComponent} from './modules/main-nav/main-nav.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { Error404Component } from './common/error-page/404.component';
import { NgSelectComponent } from './modules/test/ng-select/ng-select.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorDialogComponent,
    HomeComponent,
    LoaderComponent,
    SessionTimeoutComponent,
    SessionTimeoutDialogComponent,
    MainNavComponent,
    ProfileComponent,
    Error404Component,
    NgSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
