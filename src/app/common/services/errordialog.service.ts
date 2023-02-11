import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogComponent } from '../../common/modules/error-dialog/error-dialog.component';

@Injectable()
export class ErrorDialogService {

    constructor(
        private modalService: NgbModal,
        private router: Router
    ) { }

    openDialog = function (data: any): NgbModalRef {
        const modalRef = this.modalService.open(ErrorDialogComponent, { size: 'xl', backdrop: 'static', centered: true });
        modalRef.componentInstance.data = data;
        return modalRef;
    }
}
