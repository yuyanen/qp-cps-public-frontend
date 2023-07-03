import { Directive, ElementRef, Input } from '@angular/core';
import { AuthenticationService } from '../services'
@Directive({
    selector: '[showIfGranted]'
})
export class ShowIfGrantedDirective {

    // Note: if you want to pass in an array, remember to use [showIfGranted] instead of just showIfGranted (else it will just pass in as String)
    // Example: <label [showIfGranted]="['SP','CP']">CP/SP Info</label>
    @Input('showIfGranted') roleCode: string | string[];

    constructor(
        private el: ElementRef,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        if (!this.authenticationService.isGranted(this.roleCode)) {
            this.el.nativeElement.style.display = 'none';
        }
    }
}
