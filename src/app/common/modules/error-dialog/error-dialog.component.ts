import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as cnst from 'src/app/common/constants';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

    @Input() data: any;
    cnst = cnst;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
        // This is intentional
       
    }
}
  