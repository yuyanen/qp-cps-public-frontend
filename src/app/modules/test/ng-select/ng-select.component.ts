import { Component, Injectable, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbModal, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

    readonly DELIMITER = '-';

    parse(value: string): NgbDateStruct | null {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        let monthsList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (!date) {
            return '';
        } else {
            if (date.day < 10) {
                return date ? '0' + date.day + this.DELIMITER + monthsList[date.month - 1] + this.DELIMITER + date.year : '';
            } else {
                return date ? date.day + this.DELIMITER + monthsList[date.month - 1] + this.DELIMITER + date.year : '';
            }
        }
    }
}

@Component({
  selector: 'app-ng-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
]
})
export class NgSelectComponent implements OnInit {
  hdbTowns = [];
  trades = [];
  tenderTypes = [];

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  searchForm = this.fb.group({
    trades: [],
    tenderTypes: [],
    hdbTowns: [],
    bidClosingDateFrom: [],
    bidCurrentClosingDateTo: [],
});

constructor(
  private fb: UntypedFormBuilder
) { }

ngOnInit(): void {
  this.loadCommonTypes();
  if (this.f['bidClosingDateFrom'].value) {
    this.f['bidClosingDateFrom'].setValue(moment(this.f['bidClosingDateFrom'].value, 'DD-MMM-YYYY HH:mm:ss').format('DD-MMM-YYYY'));
  }
  if (this.f['bidCurrentClosingDateTo'].value) {
    this.f['bidCurrentClosingDateTo'].setValue(moment(this.f['bidCurrentClosingDateTo'].value, 'DD-MMM-YYYY HH:mm:ss').format('DD-MMM-YYYY'));
  }
  this.searchForm.reset()
}

loadCommonTypes() {

  // this.commonService.getHdbTowns().subscribe(data => this.hdbTowns = data);
  this.hdbTowns= [{"key":"TOWN_1","label":"Ang Mo Kio"},{"key":"TOWN_2","label":"Bedok"},{"key":"TOWN_3","label":"Bishan"},{"key":"TOWN_4","label":"Bukit Batok"},{"key":"TOWN_5","label":"Bukit Merah"},{"key":"TOWN_6","label":"Bukit Panjang"},{"key":"TOWN_7","label":"Bukit Timah"},{"key":"TOWN_8","label":"Central Area"},{"key":"TOWN_9","label":"Choa Chu Kang"},{"key":"TOWN_10","label":"Clementi"},{"key":"TOWN_11","label":"Geylang"},{"key":"TOWN_12","label":"Hougang"},{"key":"TOWN_13","label":"Jurong East"},{"key":"TOWN_14","label":"Jurong West"},{"key":"TOWN_15","label":"Kallang / Whampoa"},{"key":"TOWN_16","label":"Marine Parade"},{"key":"TOWN_17","label":"Pasir Ris"},{"key":"TOWN_18","label":"Punggol"},{"key":"TOWN_19","label":"Queenstown"},{"key":"TOWN_20","label":"Sembawang"},{"key":"TOWN_21","label":"Sengkang"},{"key":"TOWN_22","label":"Serangoon"},{"key":"TOWN_23","label":"Tampines"},{"key":"TOWN_24","label":"Toa Payoh"},{"key":"TOWN_25","label":"Woodlands"},{"key":"TOWN_26","label":"Yishun"}];
  // this.commonService.getTrades().subscribe(data => {
       this.trades = [{"key":"OPEN","label":"Open Trade","group":"Open Trade"},{"key":"1935","label":"Active Ageing Hub","group":"Specific Trade"},{"key":"1203","label":"Amusement Centre","group":"Specific Trade"},{"key":"0101","label":"Antiques, Work Of Art, Handicrafts, Curios, Stamps & Coins","group":"Specific Trade"},{"key":"0102","label":"Aquarium Fish (Freshwater/ Marine) And Accessories","group":"Specific Trade"},{"key":"0601","label":"Art Galleries","group":"Specific Trade"},{"key":"0701","label":"Art School","group":"Specific Trade"},{"key":"8901","label":"Association Building","group":"Specific Trade"},{"key":"0103","label":"Astrology, Palmistry And Other Fortune Telling Services","group":"Specific Trade"},{"key":"1802","label":"Atm/Cash Acceptance Machine (Cam)","group":"Specific Trade"},{"key":"1803","label":"Avm","group":"Specific Trade"},{"key":"1401","label":"Backpacker'S Hostel","group":"Specific Trade"},{"key":"0104","label":"Bags,Luggage & Accessories","group":"Specific Trade"},{"key":"0707","label":"Baking & Cooking School","group":"Specific Trade"},{"key":"0105","label":"Baking Equipment/ Ingredients","group":"Specific Trade"},{"key":"0804","label":"Bank","group":"Specific Trade"},{"key":"0106","label":"Barbecued Meat / Minced Meat","group":"Specific Trade"},{"key":"0107","label":"Barber Shop","group":"Specific Trade"},{"key":"0179","label":"Beauty Equipment","group":"Specific Trade"},{"key":"0108","label":"Beauty Salon","group":"Specific Trade"},{"key":"1105","label":"Beer Garden","group":"Specific Trade"},{"key":"1204","label":"Billard / Snooker Centre","group":"Specific Trade"},{"key":"1703","label":"Bin Centre","group":"Specific Trade"},{"key":"0304","label":"Bird Shop","group":"Specific Trade"},{"key":"0110","label":"Books","group":"Specific Trade"},{"key":"0111","label":"Boutique","group":"Specific Trade"},{"key":"8934","label":"Bowling Centre","group":"Specific Trade"},{"key":"0112","label":"Bridal Shop And Accessories","group":"Specific Trade"},{"key":"8951","label":"Bungalow","group":"Specific Trade"},{"key":"1702","label":"Bus Interchange","group":"Specific Trade"},{"key":"1001","label":"Cafe (Sale Of Snacks/Pastries & Drinks)","group":"Specific Trade"},{"key":"0113","label":"Cakeshop (Retailing Only With No Baking)","group":"Specific Trade"},{"key":"0114","label":"Cameras And Other Photographic Goods","group":"Specific Trade"},{"key":"1901","label":"Cancer Screening Centre","group":"Specific Trade"},{"key":"0173","label":"Car Accessories (No Repairing/ Servicing)","group":"Specific Trade"},{"key":"1715","label":"Carpark","group":"Specific Trade"},{"key":"1501","label":"Carpentry","group":"Specific Trade"},{"key":"0116","label":"Carpets","group":"Specific Trade"},{"key":"9036","label":"Child Care Centre","group":"Specific Trade"},{"key":"1902","label":"Child Care Centre","group":"Specific Trade"},{"key":"0902","label":"Childcare Centre","group":"Specific Trade"},{"key":"0117","label":"Children Apparel/ Products","group":"Specific Trade"},{"key":"0708","label":"Children Playgroup","group":"Specific Trade"},{"key":"0118","label":"Chinese Medical Hall","group":"Specific Trade"},{"key":"8903","label":"Chinese Temple","group":"Specific Trade"},{"key":"8902","label":"Church","group":"Specific Trade"},{"key":"8932","label":"Cinema","group":"Specific Trade"},{"key":"1903","label":"Civil Defence Centre","group":"Specific Trade"},{"key":"0119","label":"Clinics","group":"Specific Trade"},{"key":"0120","label":"Clocks And Watches","group":"Specific Trade"},{"key":"1301","label":"Clubhouse","group":"Specific Trade"},{"key":"8972","label":"Co Site Offices Etc","group":"Specific Trade"},{"key":"1502","label":"Cobbler","group":"Specific Trade"},{"key":"0121","label":"Coffee Powder / Tea","group":"Specific Trade"},{"key":"3218","label":"Coldroom","group":"Specific Trade"},{"key":"0122","label":"Comics Library","group":"Specific Trade"},{"key":"0703","label":"Commercial School","group":"Specific Trade"},{"key":"1904","label":"Community Centre","group":"Specific Trade"},{"key":"1716","label":"Community Centre","group":"Specific Trade"},{"key":"1905","label":"Community Children's Library","group":"Specific Trade"},{"key":"1932","label":"Community Health Centre","group":"Specific Trade"},{"key":"1937","label":"Community Museum","group":"Specific Trade"},{"key":"0123","label":"Compact Discs, Vcds, Dvds, Cassette Tapes","group":"Specific Trade"},{"key":"0709","label":"Computer School","group":"Specific Trade"},{"key":"0124","label":"Computer Spare Parts, Accessories And Softwares (No Repairing & Servicing)","group":"Specific Trade"},{"key":"0501","label":"Confectionery And Biscuits","group":"Specific Trade"},{"key":"0158","label":"Convenience Store","group":"Specific Trade"},{"key":"0125","label":"Cosmetics And Toiletries","group":"Specific Trade"},{"key":"0126","label":"Costume Jewellery","group":"Specific Trade"},{"key":"0115","label":"Curtains And Upholstery","group":"Specific Trade"},{"key":"1004","label":"Cyber Cafe","group":"Specific Trade"},{"key":"0704","label":"Dancing School","group":"Specific Trade"},{"key":"1907","label":"Day Activity Centre (Disabled)","group":"Specific Trade"},{"key":"1906","label":"Day Activity Centre (Sr Citizens)","group":"Specific Trade"},{"key":"1925","label":"Day Rehabilitation Centre","group":"Specific Trade"},{"key":"0127","label":"Dental Clinic","group":"Specific Trade"},{"key":"0202","label":"Departmental Store","group":"Specific Trade"},{"key":"1908","label":"Diabetes Edn & Care Centre","group":"Specific Trade"},{"key":"0710","label":"Dressmaking Institution","group":"Specific Trade"},{"key":"0128","label":"Dried Preserved Food","group":"Specific Trade"},{"key":"0711","label":"Driving School","group":"Specific Trade"},{"key":"1929","label":"Dyslexia Learning Centre","group":"Specific Trade"},{"key":"1101","label":"Eating House","group":"Specific Trade"},{"key":"1909","label":"Education Centre","group":"Specific Trade"},{"key":"0129","label":"Electrical Appliances","group":"Specific Trade"},{"key":"0801","label":"Employment Agency","group":"Specific Trade"},{"key":"0702","label":"Enrichment Centre","group":"Specific Trade"},{"key":"8973","label":"F Nursery/Turf Prodn","group":"Specific Trade"},{"key":"1002","label":"Family Restaurant","group":"Specific Trade"},{"key":"1930","label":"Family Service Centre","group":"Specific Trade"},{"key":"1102","label":"Fast Food Restaurant","group":"Specific Trade"},{"key":"1302","label":"Fitness Centre","group":"Specific Trade"},{"key":"8952","label":"Flats","group":"Specific Trade"},{"key":"0130","label":"Flowers, Plants & Accessories","group":"Specific Trade"},{"key":"0131","label":"Food & Beverages (Take-Away, No Consumption/No Cooking /Food Preparation At The Premises)","group":"Specific Trade"},{"key":"1503","label":"Food Catering Service","group":"Specific Trade"},{"key":"1103","label":"Foodcourt","group":"Specific Trade"},{"key":"1504","label":"Foodstuff Distributor","group":"Specific Trade"},{"key":"0132","label":"Foot Reflexology","group":"Specific Trade"},{"key":"1505","label":"Framemaking","group":"Specific Trade"},{"key":"0133","label":"Fruits (Cut / Whole )","group":"Specific Trade"},{"key":"2018","label":"Fruits/Flowers/Vegetables - Wholesale","group":"Specific Trade"},{"key":"2220","label":"Funeral Parlour","group":"Specific Trade"},{"key":"8908","label":"Funeral Parlour","group":"Specific Trade"},{"key":"0134","label":"Furniture (Mattresses, Cushion)","group":"Specific Trade"},{"key":"0135","label":"Garments","group":"Specific Trade"},{"key":"0136","label":"Gifts/ Handicraft And Fancy Goods","group":"Specific Trade"},{"key":"0137","label":"Goldsmith & Jewellery","group":"Specific Trade"},{"key":"0301","label":"Grooming Centre For Pets / Pet Spa","group":"Specific Trade"},{"key":"1303","label":"Gymnasium","group":"Specific Trade"},{"key":"0712","label":"Hair / Beauty School","group":"Specific Trade"},{"key":"0138","label":"Hairdressing Salon / Hair Treatment","group":"Specific Trade"},{"key":"0139","label":"Hardware (E.G. Do-It-Yourself Materials)/(Chains, Chignons, Axes)","group":"Specific Trade"},{"key":"0807","label":"Hdb Branch Office","group":"Specific Trade"},{"key":"1205","label":"Health Centre","group":"Specific Trade"},{"key":"0140","label":"Health Food","group":"Specific Trade"},{"key":"8904","label":"Hindu Temple","group":"Specific Trade"},{"key":"1927","label":"Hospice Care Satellite Centre","group":"Specific Trade"},{"key":"8907","label":"Hospital","group":"Specific Trade"},{"key":"0141","label":"Household Goods","group":"Specific Trade"},{"key":"0903","label":"Infant Care Centre","group":"Specific Trade"},{"key":"9037","label":"Infant Care Centre","group":"Specific Trade"},{"key":"1202","label":"Internet Surfing","group":"Specific Trade"},{"key":"0142","label":"Joss Sticks/Papers And Other Ceremonial Products","group":"Specific Trade"},{"key":"1206","label":"Karaoke Lounge","group":"Specific Trade"},{"key":"1910","label":"Kidney Dialysis Centre","group":"Specific Trade"},{"key":"0904","label":"Kindergarten","group":"Specific Trade"},{"key":"0143","label":"Launderette (Collection Of Goods To Be Washed/Cleaned Elsewhere)","group":"Specific Trade"},{"key":"0401","label":"Laundry Shop","group":"Specific Trade"},{"key":"1506","label":"Light Machine","group":"Specific Trade"},{"key":"0144","label":"Lights And Accessories","group":"Specific Trade"},{"key":"1704","label":"Link Bridge","group":"Specific Trade"},{"key":"0145","label":"Magazines And Newsvendors","group":"Specific Trade"},{"key":"0802","label":"Maid Agency","group":"Specific Trade"},{"key":"1808","label":"Market","group":"Specific Trade"},{"key":"1801","label":"Market Produce Shop","group":"Specific Trade"},{"key":"1510","label":"Mechanical Repairs","group":"Specific Trade"},{"key":"1911","label":"Medical Free Clinic","group":"Specific Trade"},{"key":"1806","label":"Medical Laboratory","group":"Specific Trade"},{"key":"1912","label":"Mental Health Centre","group":"Specific Trade"},{"key":"1507","label":"Mft Of Garment","group":"Specific Trade"},{"key":"1509","label":"Mft Of Jewellery","group":"Specific Trade"},{"key":"1508","label":"Mft Of Metal Product","group":"Specific Trade"},{"key":"0176","label":"Minimart/ Provision Shop (No Food Handling/Preparation At The Premises)","group":"Specific Trade"},{"key":"0146","label":"Minimart/ Provision Shop (No Sale Of Market Produce Goods/No Food Handling/Preparation At The Premises)","group":"Specific Trade"},{"key":"0147","label":"Money Exchange","group":"Specific Trade"},{"key":"8910","label":"Mosque","group":"Specific Trade"},{"key":"0603","label":"Motor Vehicle Showroom","group":"Specific Trade"},{"key":"1936","label":"MP'S Office","group":"Specific Trade"},{"key":"1705","label":"Multimedia Kiosk","group":"Specific Trade"},{"key":"0705","label":"Music School","group":"Specific Trade"},{"key":"0148","label":"Musical Instruments And Accessories","group":"Specific Trade"},{"key":"1913","label":"Neighbourhood Link","group":"Specific Trade"},{"key":"1714","label":"Newspaper Kiosk","group":"Specific Trade"},{"key":"1601","label":"Off-Course Betting Centre","group":"Specific Trade"},{"key":"0805","label":"Office","group":"Specific Trade"},{"key":"0149","label":"Office Equipments","group":"Specific Trade"},{"key":"0150","label":"Optical Goods & Eyewear","group":"Specific Trade"},{"key":"1106","label":"Ora","group":"Specific Trade"},{"key":"8975","label":"Others","group":"Specific Trade"},{"key":"9999","label":"Others","group":"Specific Trade"},{"key":"0151","label":"Paint","group":"Specific Trade"},{"key":"1720","label":"Parcel Stations","group":"Specific Trade"},{"key":"0152","label":"Pawnshop","group":"Specific Trade"},{"key":"1719","label":"Pay2Home Express Terminal","group":"Specific Trade"},{"key":"0153","label":"Pet Foods And Accessories","group":"Specific Trade"},{"key":"0302","label":"Pet Shop & Accessories","group":"Specific Trade"},{"key":"8933","label":"Petrol Station","group":"Specific Trade"},{"key":"0154","label":"Pharmacies & Medical Equipment","group":"Specific Trade"},{"key":"1706","label":"Phone Booth/ Public Payphone","group":"Specific Trade"},{"key":"0156","label":"Photo Frames","group":"Specific Trade"},{"key":"0157","label":"Photo Processing / Laminating/ Studio","group":"Specific Trade"},{"key":"0155","label":"Photocopying","group":"Specific Trade"},{"key":"1914","label":"Police Post","group":"Specific Trade"},{"key":"1805","label":"Polyclinic","group":"Specific Trade"},{"key":"0806","label":"Post Office","group":"Specific Trade"},{"key":"1512","label":"Printing","group":"Specific Trade"},{"key":"1707","label":"Promotion Booth","group":"Specific Trade"},{"key":"8906","label":"Pub/Tas","group":"Specific Trade"},{"key":"1804","label":"Radio Equipment Room/Telemonitoring System Room","group":"Specific Trade"},{"key":"1916","label":"Rc Centre","group":"Specific Trade"},{"key":"0803","label":"Real Estate Agency","group":"Specific Trade"},{"key":"1708","label":"Recess Area/Corridor Space","group":"Specific Trade"},{"key":"8905","label":"Recreational","group":"Specific Trade"},{"key":"1917","label":"Recreational Centre (Boys' Club/ Family Club)","group":"Specific Trade"},{"key":"2214","label":"Religious Articles","group":"Specific Trade"},{"key":"1807","label":"Residential","group":"Specific Trade"},{"key":"180","label":"RESIDENTIAL (RECESS AREA)","group":"Specific Trade"},{"key":"1800","label":"Residential (Recess Area)","group":"Specific Trade"},{"key":"1104","label":"Restaurant","group":"Specific Trade"},{"key":"1709","label":"Retail Carts","group":"Specific Trade"},{"key":"0175","label":"Retail Cum Lifestyle Hub","group":"Specific Trade"},{"key":"1304","label":"Rock Climbing Facility","group":"Specific Trade"},{"key":"1602","label":"Sale Of Bets (Including 4-D/Toto)","group":"Specific Trade"},{"key":"0109","label":"Sale Of Bicycles, Personal Mobility Devices And Accessories (No Repairing & Installation)","group":"Specific Trade"},{"key":"0177","label":"Sale Of Bicycles, Personal Mobility Devices, Accessories And Servicing","group":"Specific Trade"},{"key":"0178","label":"Sale Of Frozen Food","group":"Specific Trade"},{"key":"1918","label":"Satellite Fire Post","group":"Specific Trade"},{"key":"0174","label":"Second-Hand Goods","group":"Specific Trade"},{"key":"1701","label":"Self Automated Machine (Sam)/Inets","group":"Specific Trade"},{"key":"1934","label":"Senior Activity Centre","group":"Specific Trade"},{"key":"1931","label":"Senior Activity Centre (Sa)","group":"Specific Trade"},{"key":"1933","label":"Senior Care Centre","group":"Specific Trade"},{"key":"1919","label":"Senior Citizen Centre","group":"Specific Trade"},{"key":"1717","label":"Service & Conservancy Charge","group":"Specific Trade"},{"key":"1718","label":"Service Yard","group":"Specific Trade"},{"key":"0160","label":"Sewing And Clothing Accessories (E.G Buttons, Thread, Lace, Zip Etc)","group":"Specific Trade"},{"key":"1928","label":"Sheltered Home / Old Folks' Home","group":"Specific Trade"},{"key":"1513","label":"Ship Chandling","group":"Specific Trade"},{"key":"0161","label":"Shoes/ Footwear","group":"Specific Trade"},{"key":"8931","label":"Shophouse","group":"Specific Trade"},{"key":"0602","label":"Showroom For Interior Design / Renovation Materials/ Furnishings","group":"Specific Trade"},{"key":"1710","label":"Signage","group":"Specific Trade"},{"key":"0159","label":"Signboards & Promotional Materials","group":"Specific Trade"},{"key":"8909","label":"Sikh Temple","group":"Specific Trade"},{"key":"1711","label":"Smart Lockers","group":"Specific Trade"},{"key":"1921","label":"Social Function Hall","group":"Specific Trade"},{"key":"1920","label":"Social Service Centre","group":"Specific Trade"},{"key":"1201","label":"Spa/Body Massage","group":"Specific Trade"},{"key":"0713","label":"Speech & Drama School","group":"Specific Trade"},{"key":"0162","label":"Sports / Athletic Goods, Equipments And Other Recreational Goods","group":"Specific Trade"},{"key":"8971","label":"Squatter/Acquired","group":"Specific Trade"},{"key":"1712","label":"Standees","group":"Specific Trade"},{"key":"0163","label":"Stationery","group":"Specific Trade"},{"key":"1511","label":"Storage","group":"Specific Trade"},{"key":"1922","label":"Student Care Centre","group":"Specific Trade"},{"key":"0901","label":"Student Care Centre","group":"Specific Trade"},{"key":"1923","label":"Student Service Centre","group":"Specific Trade"},{"key":"1924","label":"Study Centre/ Reading Room","group":"Specific Trade"},{"key":"0201","label":"Supermarket","group":"Specific Trade"},{"key":"0164","label":"Tailor / Dressmaking Shop","group":"Specific Trade"},{"key":"1713","label":"Taxi Kiosk","group":"Specific Trade"},{"key":"1003","label":"Teahouse/ Dessert Shop","group":"Specific Trade"},{"key":"0165","label":"Telecommunication Equipment/ Handphone & Accessories","group":"Specific Trade"},{"key":"0167","label":"Textiles","group":"Specific Trade"},{"key":"0168","label":"Titbits / Preserved Fruits/ Candies","group":"Specific Trade"},{"key":"0808","label":"Town Council Office","group":"Specific Trade"},{"key":"8974","label":"Town Councils","group":"Specific Trade"},{"key":"0169","label":"Toys And Games","group":"Specific Trade"},{"key":"0166","label":"Traditional Chinese Medicine/ Chinese Physician/ Chinese Physiotherapy","group":"Specific Trade"},{"key":"0170","label":"Travel Agency / Ticketing Agency","group":"Specific Trade"},{"key":"0706","label":"Tuition Centre","group":"Specific Trade"},{"key":"0","label":"Unknown","group":"Specific Trade"},{"key":"0303","label":"Vet Clinic","group":"Specific Trade"},{"key":"0172","label":"Video Library","group":"Specific Trade"},{"key":"3216","label":"Warehouse","group":"Specific Trade"},{"key":"0171","label":"Wineshop & Accessories","group":"Specific Trade"},{"key":"1926","label":"Youth Centre","group":"Specific Trade"}];
  // });
  // this.commonService.getOpenTenderTypes().subscribe(data => {
     this.tenderTypes = [{"key":"TNDR_O_EBD","label":"Open E-Bidding"},{"key":"TNDR_O_PRC","label":"Open Price Only"},{"key":"TNDR_O_PQM","label":"Open PQM"}];
  // });
}

clearSearchFilter() {
  this.searchForm.reset();
  this.fromDate = null;
  this.toDate = null;
}

get f() {
  return this.searchForm.controls;
}

closePopover() {
 // this.close.emit();
}

setDateValue(ngbDate: NgbDateStruct, bidClosingDate) {
  let monthsList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (ngbDate) {
      let stringDate = '';
      if (ngbDate.day < 10) {
          stringDate = '0' + ngbDate.day + '-' + monthsList[ngbDate.month - 1] + '-' + ngbDate.year;
      } else {
          stringDate = ngbDate.day + '-' + monthsList[ngbDate.month - 1] + '-' + ngbDate.year;
      }
      bidClosingDate.setValue(stringDate);
  } else {
      bidClosingDate.setValue(null);
  }
}

applyFilter() {
  // this.search.emit();
  // this.close.emit();
}

validateDate() {
  // if (this.f.bidClosingDateFrom.value && this.f.bidCurrentClosingDateTo.value) {
  //     DateUtil.isDateBefore(this.searchForm, 'bidClosingDateFrom', 'bidCurrentClosingDateTo');
  // }
}

onDateSelect(event) {
//   this.setDateValue(this.fromDate, this.f.bidClosingDateFrom)
//   this.setDateValue(this.toDate, this.f.bidCurrentClosingDateTo)

//   if (this.f.bidClosingDateFrom.value && this.f.bidCurrentClosingDateTo.value) {
//       DateUtil.isDateBefore(this.searchForm, 'bidClosingDateFrom', 'bidCurrentClosingDateTo');
//   }
 }

}
