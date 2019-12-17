import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  
  constructor( private _router: Router) { }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      return true;      
    }

    // navigate to login page
    this._router.navigate(['/user/signin']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
