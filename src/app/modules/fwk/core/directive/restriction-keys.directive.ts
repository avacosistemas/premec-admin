import { Directive, HostListener, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
selector: '[restrictionKeys]'
})
export class RestrictionKeysDirective {
    @Input('restrictionKeys') inputType: any;

    showMsg = false;
    pattern: RegExp;

    constructor(public el: ElementRef, public renderer: Renderer2) {}

    @HostListener('keypress', ['$event']) onInput(e) {
        const inputChar = e.key;
        if (this.inputType !== undefined && this.inputType !== ''){
            const regex = new RegExp(this.inputType);
            regex.lastIndex = 0; // dont know why but had to add this
            if (regex.test(inputChar)) {    
            } else {
                e.preventDefault();
            }
        }
    }
}
