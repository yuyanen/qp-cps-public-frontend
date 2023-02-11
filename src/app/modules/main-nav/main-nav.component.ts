import { Component, OnInit } from '@angular/core';
import * as cnst from 'src/app/common/constants';
import { AuthenticationService } from 'src/app/common/services';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
    cnst = cnst;
    isMenuCollapsed = true;
    selectedMenu = '';

    constructor(
        public authenticationService: AuthenticationService,
    ) { }

    ngOnInit() {
      // This is intentional
    }

    onCloseNav() {
        this.isMenuCollapsed = true;
        this.selectedMenu = '';
    }

}
