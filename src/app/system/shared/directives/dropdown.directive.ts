import { Directive, HostBinding, HostListener } from '../../../../../node_modules/@angular/core';

@Directive({
    selector: '[mmDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') onclick() {
        this.isOpen = !this.isOpen;
    }
}
