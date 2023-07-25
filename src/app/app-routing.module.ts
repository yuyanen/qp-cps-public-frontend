import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent } from "../app/modules/login/login.component"
import {AuthGuard} from "../app/common/guard/auth.guard"
import {PristineGuard} from "../app/common/guard/pristine.guard"
import { HomeComponent } from './modules/home/home.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { Error404Component } from './common/error-page/404.component';
import { NgSelectComponent } from './modules/test/ng-select/ng-select.component';
import {LandingPageComponent} from '../app/modules/landing-page/landing-page.component';
import { BulletinListingComponent } from './bulletin/bulletin-listing/bulletin-listing.component';
import { BulletinViewComponent } from './bulletin/bulletin-view/bulletin-view.component';

const routes: Routes = [

  // { path: '', component: HomeComponent },
  { path: '', component: LandingPageComponent, },
  // { path: 'login', component: LoginComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'test', component: NgSelectComponent },
  {
    path: '',
    data: { breadCrum: 'Home' },
    children: [
        {
            path: 'view-products/:view-products',
            data: { breadCrum: 'View Products' },
            children: [
                // {
                //     path: 'unit-details/:id', component: PqmUnitDetailsComponent,
                //     data: { breadCrum: 'View Unit' },

                // },
                // {
                //     path: 'ebid-unit-details/:id', component: EbidUnitDetailsComponent,
                //     data: { breadCrum: 'View Unit' },
                // },
                // {
                //     path: 'ebid-unit-details/:id',
                //     data: { breadCrum: 'View Unit' },
                //     children: [
                //         {
                //             path: 'my-tender/:id', component: MyTenderComponent, canActivate: [AuthGuard],
                //             data: { breadCrum: 'My Tender' },

                //         }
                //     ]
                // },
                
            ]
        },{
          path: 'bulletin-listing', component: BulletinListingComponent,
          data: { breadCrum: 'Bulletin Board', hideInSiteMap: true },
          }, 
          {
          path: 'bulletin-listing',
          data: { breadCrum: 'Bulletin Board' },
          children: [
              {
                  path: 'bulletin-view/:id', component: BulletinViewComponent,
                  data: { breadCrum: 'View Bulletin' },
              }
          ]
      },
    ]
  },
  { path: '**', component: Error404Component },
  { path: 'view-products/:view-products', component: LandingPageComponent, },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, PristineGuard]
})
export class AppRoutingModule { }
