import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as cnst from 'src/app/common/constants';

@Component({
    selector: 'app-404error',
    templateUrl: './404.html',
    styleUrls: ['./404.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class Error404Component implements OnInit {
    cnst = cnst;

    ngOnInit(): void {
        // This is intentional
    }

}
