import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileUtil } from 'src/app/common/utils/';
import { BulletinViewService } from './bulletin-view.service';


@Component({
    selector: 'app-bulletin-view',
    templateUrl: './bulletin-view.component.html',
    styleUrls: ['./bulletin-view.component.scss'],
})
export class BulletinViewComponent implements OnInit {
    bulletinId: number;

    bulletin: any = [];

    constructor(private fb: UntypedFormBuilder, public fileUtil: FileUtil, private route: ActivatedRoute, private bulletinViewService: BulletinViewService,) { }

    ngOnInit(): void {

        this.bulletinId = +this.route.snapshot.paramMap.get('id');
        if (this.bulletinId >= 0) {
            this.bulletinViewService.getBulletinDetails(this.bulletinId).subscribe(data => {
                this.bulletin = data;

                // Regex to remove font-family from innerHTML
                if (this.bulletin.content) {
                    this.bulletin.content = this.bulletin.content.replace(/font-family[^;]*;/g, "\"");
                }
            });
        }
    }

    download(fileId: number, fileName: any, hash: any) {
        this.fileUtil.publicDownload_newWindow(fileId, fileName, hash);
    }

}
