import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as cnst from 'src/app/common/constants';
import SwiperCore, { A11y, Navigation, Pagination, Lazy } from "swiper/core";

//import { SortableDirective } from '../common/directives/sortable.directive';

import { CommonService } from '../../common/services/common.service';
import { LandingPageService } from './landing-page.service';
import {BulletinListingService} from '../../bulletin/bulletin-listing/bulletin-listing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  banners: any;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
 
    private landingPageService: LandingPageService,
    private bulletinListingService: BulletinListingService,
) { }
  
  ngOnInit() {
   
    this.loadTopBanners();


    // if (this.route.snapshot.paramMap.get('view-properties')) {
    //     setTimeout(() => {
    //         this.commonService.scrollToElement("view-properties");
    //     }, 280);
    // }
}

loadTopBanners() {

  let bulletinFilter = this.commonService.getSearchDto({ page: 1 }, { bulletinType: cnst.AnnouncementType.TOP_BANNER, });
  this.bulletinListingService.loadBulletinListing(bulletinFilter).subscribe(data => {
      this.banners = data.items;
  });


}


}
