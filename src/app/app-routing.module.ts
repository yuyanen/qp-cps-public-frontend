import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent } from "../app/modules/login/login.component"
import {AuthGuard} from "../app/common/guard/auth.guard"
import {PristineGuard} from "../app/common/guard/pristine.guard"
import { HomeComponent } from './modules/home/home.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { Error404Component } from './common/error-page/404.component';
import { NgSelectComponent } from './modules/test/ng-select/ng-select.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'test', component: NgSelectComponent },
  { path: '**', component: Error404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, PristineGuard]
})
export class AppRoutingModule { }
