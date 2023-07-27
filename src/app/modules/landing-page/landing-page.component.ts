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

  let bulletinFilter = this.commonService.getSearchDto({ page: 1,pageSize:10 }, { bulletinType: cnst.AnnouncementType.TOP_BANNER, });
  this.bulletinListingService.loadBulletinListing(bulletinFilter).subscribe(data => {
  //    this.banners = data.items;
       var data2= {
        "total": 3,
        "noOfPages": 1,
        "items": [
            {
                "id": 21,
                "title": "Anchorvale Village",
                "buttonText": "Find out more",
                "content": "<p class=\"null\" style=\"margin-left: 8.85pt; text-align: justify;\"><span class=\"null1\"><span style=\"font-size: 12.0pt; font-family: 'Arial',sans-serif;\">Anchorvale Village is a New Generation Neighbourhood Centre located at Anchorvale Road, a short walk from Farmway LRT station. The Neighbourhood Centre is designed with 3 levels of retail spaces, providing Anchorvale residents with convenient access to supermarket, restaurants, eateries, shops and enrichment centres, as well as a hawker centre on the 2<sup>nd</sup> storey.</span></span></p>\n<p class=\"null\" style=\"margin-left: 8.85pt; text-align: justify;\"><span class=\"null1\"><span style=\"font-size: 12.0pt; font-family: 'Arial',sans-serif;\">Designed with a focus on providing ample spaces for community bonding, the Neighbourhood Centre will feature a community plaza space on the first storey, as well as landscaped spaces at the roof garden, which includes a fitness station and playground, for residents to meet and interact with each other and foster a strong community spirit at Anchorvale Village. </span></span></p>\n<p class=\"null\" style=\"margin-left: 8.85pt; text-align: justify;\"><span class=\"null1\"><span style=\"font-size: 12.0pt; font-family: 'Arial',sans-serif;\">Residents can look forward to the opening of the Anchorvale Village in 2H2023. </span></span></p>",
                "type": "ANNC_TOP_BANNER",
                "effectiveDate": "6 September 2022",
                "expiryDate": "31 December 2024",
                "imageID": 108,
                "imageFile": null,
                "attachments": [],
                "imageUrl": "https://place2lease.hdb.gov.sg/media/DOC_ANNOUNCEMENT_BANNER/108"
            },
            {
                "id": 5,
                "title": "Hougang Rivercourt",
                "buttonText": "Find out more",
                "content": "<p style=\"background: white;\"><span style=\"font-size: 12.0pt; font-family: 'Arial',sans-serif; color: #383838;\">Hougang RiverCourt is HDB&rsquo;s latest addition to the list of new generation neighbourhood centres! Situated at the junction of Tampines Road and Hougang Avenue 7, Hougang RiverCourt provides residents with much convenience through its wide array of shopping and dining options.</span></p>\n<p style=\"background: white;\"><span style=\"color: #383838; font-family: Arial, sans-serif; font-size: 12pt;\">Offering more than just retail shops, the new mall has a supermarket, a food court, attractive food outlets, and essential enrichment centres. There are also landscaped roof gardens, a multi-storey carpark, and a variety of recreational and communal facilities such as children&rsquo;s playground, fitness corners and other amenities to promote communal bonding among residents.</span></p>",
                "type": "ANNC_TOP_BANNER",
                "effectiveDate": "20 August 2022",
                "expiryDate": "31 August 2032",
                "imageID": 26,
                "imageFile": null,
                "attachments": [],
                "imageUrl": "https://place2lease.hdb.gov.sg/media/DOC_ANNOUNCEMENT_BANNER/26"
            },
            {
                "id": 4,
                "title": "Northshore Plaza",
                "buttonText": "Find out more",
                "content": "<p style=\"margin-bottom: 12.0pt; background: white;\"><span style=\"font-size: 12.0pt; font-family: 'Arial',sans-serif; color: #383838;\">Located in the heart of Northshore District in Punggol Eco-Town, Northshore Plaza is the first seafront New Generation Neighbourhood Centre to be built in an HDB estate, offering residents a unique waterfront shopping experience. It houses a supermarket, food court, restaurants, eateries, shops, childcare centre, and enrichment centres.</span></p>\n<p style=\"margin-bottom: 12.0pt; background: white;\"><span style=\"font-size: 12pt; font-family: Arial, sans-serif; color: #383838;\">Beyond commercial facilities, Northshore Plaza is also designed around a comprehensive network of community spaces and parks. The community spine seamlessly connects Northshore Plaza to the residential blocks and the Samudera LRT station. This naturally-ventilated corridor extends alongside the common green to Punggol Promenade, providing convenient and sheltered access to the waterfront.</span><span style=\"font-size: 12pt; font-family: Arial, sans-serif; color: #131313;\">&nbsp;</span></p>",
                "type": "ANNC_TOP_BANNER",
                "effectiveDate": "20 August 2022",
                "expiryDate": "31 August 2032",
                "imageID": 25,
                "imageFile": null,
                "attachments": [],
                "imageUrl": "https://place2lease.hdb.gov.sg/media/DOC_ANNOUNCEMENT_BANNER/25"
            }
        ]
    }
    this.banners = data.items;

  });


}


}
