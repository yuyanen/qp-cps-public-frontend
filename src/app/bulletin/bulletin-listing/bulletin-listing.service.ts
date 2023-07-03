import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as cnst from '../../common/constants';

@Injectable({
    providedIn: 'root'
})
export class BulletinListingService {

    constructor(private http: HttpClient) { }

    loadBulletinListing(searchDto: any): Observable<any> {
        return this.http.get<any>(cnst.apiBaseUrl + cnst.ApiUrl.BULLETIN_BOARD, { params: searchDto });
    }
}
