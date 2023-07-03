import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import * as cnst from '../constants';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @ViewChild(NgbPagination) public paginator: NgbPagination;
    @Output() pageChange = new EventEmitter<any>();
    @Input() filter: any;

    cnst = cnst;

    ngOnInit(): void {
        if (!this.filter) {
            this.filter = { page: 1, pageSize: cnst.Pagination.DEFAULT_PAGE_SIZE };
        }
    }

    changePageSize() {
        this.paginator.pageSize = this.filter.pageSize;
        this.loadData();
    }

    loadData() {
        this.pageChange.emit(this.filter);
    }
}
