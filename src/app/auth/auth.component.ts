import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
    selector: 'mm-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    constructor (private router: Router) {}
    ngOnInit() {
        this.router.navigate(['/login']);
    }
}
