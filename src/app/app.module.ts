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
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { BannerSliderComponent } from './modules/landing-page/banner-slider/banner-slider.component';
import { BulletinListingComponent } from './bulletin/bulletin-listing/bulletin-listing.component';
import { BulletinViewComponent } from './bulletin/bulletin-view/bulletin-view.component';
import { AppBreadCrumbComponent } from './common/app-bread-crumb/app-bread-crumb.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { AreaSqFtUnitPipe, ExerciseNoFilterPipe, FileSizePipe, FilterPipe, SafeHtmlPipe } from './common/pipes';
import { ShowIfGrantedDirective } from './common/directives/show-if-granted.directive';
import { SortableDirective } from './common/directives/sortable.directive';
import { NumbersOnlyDirective } from './common/directives/numbers-only.directive';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    AppComponent,
    SortableDirective,
    ShowIfGrantedDirective,
    NumbersOnlyDirective,
    LoginComponent,
    ErrorDialogComponent,
    HomeComponent,
    LoaderComponent,
    SessionTimeoutComponent,
    SessionTimeoutDialogComponent,
    MainNavComponent,
    ProfileComponent,
    Error404Component,
    NgSelectComponent,
    LandingPageComponent,
    BannerSliderComponent,
    BulletinListingComponent,
    BulletinViewComponent,
    AppBreadCrumbComponent,
    PaginationComponent,
    ExerciseNoFilterPipe,
    FilterPipe,
    FileSizePipe,
    AreaSqFtUnitPipe,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    SwiperModule
  ],
  providers: [ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
