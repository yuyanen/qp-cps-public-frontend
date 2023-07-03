import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { of,Observable } from 'rxjs';
import * as cnst from '../constants';
import { CommonService } from '../../common/services/common.service';
import { ErrorDialogService } from '../services/errordialog.service';
import { FormUtil } from './form.util';

@Injectable({
    providedIn: 'root'
})
export class FileUtil {

    systemParamMaxFileSize: number;

    constructor(private http: HttpClient, public errorDialogService: ErrorDialogService, private commonService: CommonService, private fb: FormBuilder, private formUtil: FormUtil
    ) {

        this.commonService.getMaxFileSize().subscribe(data => {
            this.systemParamMaxFileSize = data;
        });

    }

    exportForDesktop(data: any, fileName: string) { //this method can use for desktop can download csv. for tablet the download outcome user does not like
        // const blob = new Blob([data], { type: 'application/octet-stream' });
        // var link = document.createElement('a');
        // link.href = window.URL.createObjectURL(blob);
        // link.download = fileName;
        // link.click();

        const blob = new Blob([data], { type: data.type });
        if ((window.navigator as any).msSaveOrOpenBlob) // Use type assertion
        {
            (window.navigator as any).msSaveOrOpenBlob(blob, fileName);
        }
        else //Chrome & FF
        {
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = fileName;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        }
    }

    export(data: any, fileName: string) { //this method can use for tablet but csv cannot download
        const blob = new Blob([data], { type: data.type });
        let lowercaseFileName = fileName.toLowerCase();
        if (fileName.match('msg')) {
            FileSaver.saveAs(blob, fileName);
        } else {
            if ((window.navigator as any).msSaveOrOpenBlob) { //IE & Edge
                (window.navigator as any).msSaveOrOpenBlob(blob, fileName);
            } else if ((navigator.userAgent.match('CriOS') || navigator.userAgent.match('Chrome'))) { //Chrome iOS
                if ((lowercaseFileName.match('pdf') || lowercaseFileName.match('img') || lowercaseFileName.match('jpg') || lowercaseFileName.match('jpeg') || lowercaseFileName.match('gif') || lowercaseFileName.match('png') || lowercaseFileName.match('zip') || lowercaseFileName.match('jfif') || lowercaseFileName.match('bmp') || lowercaseFileName.match('docx') || lowercaseFileName.match('mp4') || lowercaseFileName.match('doc'))) {
                    let url = window.URL.createObjectURL(blob);
                    window.open(url, '_blank');
                } else {
                    let reader = new FileReader();
                    reader.onloadend = function () { window.open(reader.result as string); };
                    reader.readAsDataURL(blob);

                }
            } else if (window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPhone/i)) { //Safari & Opera iOS
                let link = window.URL.createObjectURL(blob);
                window.open(link, "_blank");
            } else {
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = fileName;
                document.body.appendChild(anchor); 
                anchor.click();
                document.body.removeChild(anchor);
            }
        }
    }

    formatBytes(a, b) { if (0 == a) return "0 Bytes"; var c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c)); return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f] }


    download(fileId: number, hash: any): Observable<any> {
      //  if (fileId != null) {
            return this.http.get<any>(cnst.apiBaseUrl + '/file/download/' + fileId + '/' + hash, { responseType: 'blob' as 'json' });
      //  }

    }

    publicDownload(fileId: number, hash: any): Observable<any> {
       // if (fileId != null) {
            return this.http.get<any>(cnst.apiBaseUrl + '/file/public/download/' + fileId + '/' + hash, { responseType: 'blob' as 'json' });
       // }
       // return null; // or return undefined;

    }

    // Bypass popups blocks and display the files in a new window
    publicDownload_newWindow(fileId: number, fileName: any, hash: any) {
        let newWindow = window.open();
        newWindow.location.href = ""
        if (fileId != null) {
            this.http.get<any>(cnst.apiBaseUrl + '/file/public/download/' + fileId + '/' + hash, { responseType: 'blob' as 'json' }).subscribe(data => {
                const blob = new Blob([data], { type: data.type });
                var lowercaseFileName = fileName.toLowerCase();
                if (fileName.match('msg')) {
                    FileSaver.saveAs(blob, fileName);
                } else {
                    if ((window.navigator as any).msSaveOrOpenBlob) // Use type assertion
                    {
                        (window.navigator as any).msSaveOrOpenBlob(blob, fileName);
                    }else if ((navigator.userAgent.match('CriOS') || navigator.userAgent.match('Chrome'))) { //Chrome iOS
                        if ((lowercaseFileName.match('pdf') || lowercaseFileName.match('img') || lowercaseFileName.match('jpg') || lowercaseFileName.match('jpeg') || lowercaseFileName.match('gif') || lowercaseFileName.match('png') || lowercaseFileName.match('zip') || lowercaseFileName.match('jfif') || lowercaseFileName.match('bmp') || lowercaseFileName.match('docx') || lowercaseFileName.match('mp4') || lowercaseFileName.match('doc'))) {
                            var url = window.URL.createObjectURL(blob);
                            newWindow.location.href = url;
                        } else {
                            var reader = new FileReader();
                            reader.onloadend = function () { newWindow.open(reader.result as string); };
                            reader.readAsDataURL(blob);

                        }
                    } else if (window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPhone/i)) { //Safari & Opera iOS
                        var link = window.URL.createObjectURL(blob);
                        newWindow.location.href = link;
                    } else {
                        const url = window.URL.createObjectURL(blob);
                        const anchor = document.createElement("a");
                        anchor.href = url;
                        anchor.download = fileName;
                        document.body.appendChild(anchor);
                        anchor.click();
                        document.body.removeChild(anchor);
                    }
                }
            });
        }
    }

    upload(type: string, file: any) {
        let formData = this.formUtil.buildAttachmentFormDataByType(type, file);
        if (file.size <= this.systemParamMaxFileSize) {
            return this.http.post(cnst.apiBaseUrl + '/file/upload', formData);
        } else {
            const modalRef = this.errorDialogService.openDialog({ reason: "Uploaded file size cannot exceed " + this.formatBytes(this.systemParamMaxFileSize, 2) + "." });
            throw new Error("Uploaded file4 size cannot exceed " + this.formatBytes(this.systemParamMaxFileSize, 2) + ".");
        }
    }

    delete(deletedFiles: any) {
        return this.http.post(cnst.apiBaseUrl + '/file/delete', deletedFiles);
    }

    exceedMaxSize(file: any, definedMaxSize?: any) {
        if ((definedMaxSize && file.size >= definedMaxSize) || file.size > this.systemParamMaxFileSize) {
            const modalRef = this.errorDialogService.openDialog({ reason: "Uploaded file size cannot exceed " + this.formatBytes(definedMaxSize ? definedMaxSize : this.systemParamMaxFileSize, 2) + "." });
            return true;
        }
        return false;
    }

    exceedMinSize(file: any) {
        if (file.size < cnst.MIN_FILE_SIZE) {
            const modalRef = this.errorDialogService.openDialog({ reason: "Uploaded file size cannot be below " + this.formatBytes(cnst.MIN_FILE_SIZE, 2) + "." });
            return true;
        }
        return false;
    }

    downloadAndExport(fileId: number, fileName: any, hash: any) {
        this.download(fileId, hash).subscribe(data => {
            this.export(data, fileName);
        });
    }

    checkFileType(extension) {
        if (cnst.FileExt.IMAGES.includes(extension)) {
            return "far fa-image";
        } else if (extension === 'pdf') {
            return "far fa-file-pdf";
        } else {
            return "far fa-file";
        }
    }
}