import { Component,OnInit } from '@angular/core';
import { NgbPopover, NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogService } from '../../common/services/errordialog.service';
import {NgSelectComponent} from '../test/ng-select/ng-select.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tenderTypes =[];

  constructor( 
    private modalService: NgbModal,
    private errorDialogService: ErrorDialogService,

  
) { }

  ngOnInit(): void {
    this.tenderTypes = [{"key":"TNDR_O_EBD","label":"Open E-Bidding"},{"key":"TNDR_O_PRC","label":"Open Price Only"},{"key":"TNDR_O_PQM","label":"Open PQM"}];
  }
  
  openFilter= function (content: any): NgbModalRef {
    const modalRef =  this.modalService.open(content, { size: 'lg' },);
    return modalRef;
}
openFilter2() {
 var data = {
    reason: 'The record(s) you are updating is outdated. Please refresh the page and try again.'
};
this.openDialog2(data);
}

openDialog2 = function (data: any): NgbModalRef {
  const modalRef = this.modalService.open(NgSelectComponent, { size: 'lg' });
  modalRef.componentInstance.data = data;
  return modalRef;
}


}
