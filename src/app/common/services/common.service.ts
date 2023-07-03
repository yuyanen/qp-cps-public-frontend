import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { AlertService } from 'src/app/common/services/alert.service';
import * as cnst from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService,
    private modalService: NgbModal
) { }

  public getSearchDto(filter: any, searchFilter: any): any {
    let searchDto: any;

    searchDto = {
        ...filter,
        ...searchFilter,
        'startIndex': filter.pageSize ? (filter.page * filter.pageSize) - filter.pageSize : 0,
    };
    if (!searchDto.order) {
        delete searchDto.orderProperty;
    }
    Object.keys(searchDto).forEach(filterKey => {
        if (searchDto[filterKey] === null || searchDto[filterKey] === "") {
            delete searchDto[filterKey];
        }
    })
    return searchDto;
  }
  
  getMaxFileSize(): Observable<any> {
    return this.http.get<any>(cnst.apiBaseUrl + cnst.ApiUrl.COMMON + '/max-file-size');
  }

getFormList(key: string): Observable<any> {
    return this.http.get<any>(cnst.apiBaseUrl + cnst.ApiUrl.COMMON + '/formList/' + key);
}

}
