import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];

@Pipe({
    name: 'filesize'
})
export class FileSizePipe implements PipeTransform {
    transform(size: number): string {
        if (isNaN(size))
            size = 0;

        if (size < 1024)
            return numberWithCommas(size) + ' Bytes';

        size /= 1024;

        if (size < 1024)
            return numberWithCommas(Math.ceil(size)) + ' KB';

        size /= 1024;

        if (size < 1024)
            return numberWithCommas(size.toFixed(2)) + ' MB';

        size /= 1024;

        if (size < 1024)
            return numberWithCommas(size.toFixed(2)) + ' GB';

        size /= 1024;

        return numberWithCommas(size.toFixed(2)) + ' TB';
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}