import { Component, OnInit, Injectable } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BulletinListingService } from '../bulletin-listing/bulletin-listing.service'
import * as cnst from 'src/app/common/constants';
import { CommonService } from '../../common/services/common.service';
import { DateUtil } from 'src/app/common/utils/date.util';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';



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
        var monthsList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
    selector: 'app-bulletin-listing',
    templateUrl: './bulletin-listing.component.html',
    styleUrls: ['./bulletin-listing.component.scss'],
    providers: [
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
    ]
})
export class BulletinListingComponent implements OnInit {
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;

    cnst = cnst;
    searchForm = this.fb.group({
        year: [],
        publishDateFrom: [],
        publishDateTo: [],
    });
    years: any = [];
    bulletins: any = [];
    filter: any = { page: 1, pageSize: cnst.Pagination.DEFAULT_PAGE_SIZE, };
    publishDateFrom;
    publishDateTo;

    constructor(
        private fb: UntypedFormBuilder,
        private bulletinListingService: BulletinListingService,
        private commonService: CommonService,
    ) { }

    ngOnInit(): void {
        this.getYearsBetween();
        this.loadBulletinBoard(false);
    }

    get f() {
        return this.searchForm.controls;
    }

    setDateValue(ngbDate: NgbDateStruct, publishDate) {
        var monthsList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (ngbDate) {
            var stringDate = '';
            if (ngbDate.day < 10) {
                stringDate = '0' + ngbDate.day + '-' + monthsList[ngbDate.month - 1] + '-' + ngbDate.year;
            } else {
                stringDate = ngbDate.day + '-' + monthsList[ngbDate.month - 1] + '-' + ngbDate.year;
            }
            publishDate.setValue(stringDate);
        } else {
            publishDate.setValue(null);
        }
    }

    loadBulletinBoard(resetPage) {
        if (this.searchForm.valid) {
            if (resetPage) {
                this.filter.page = 1;
            }
            this.filter = this.commonService.getSearchDto(this.filter, this.searchForm.value);
            this.bulletinListingService.loadBulletinListing(this.filter).subscribe(data => {
                this.bulletins = data.items;
                this.filter.collectionSize = data.total;
            });
        }
    }

    getYearsBetween() {
        const rangeOfYears = (start, end) => Array(end - start + 1)
            .fill(start)
            .map((year, index) => year + index)

        rangeOfYears(new Date("Apr 27 2021").getFullYear(), new Date().getFullYear()).forEach(years => {
            this.years.push(years)
        })
    }

    onDateSelect(event) {
        this.setDateValue(this.fromDate, this.f['publishDateFrom']);
        this.setDateValue(this.toDate, this.f['publishDateTo']);
      
        if (this.f['publishDateFrom'].value && this.f['publishDateTo'].value) {
          DateUtil.isDateBefore(this.searchForm, 'publishDateFrom', 'publishDateTo');
        }
      }
      

}
