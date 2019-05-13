import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public router: Router) { }

    canActivate(): boolean {
        if (localStorage.getItem('token') == null) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}