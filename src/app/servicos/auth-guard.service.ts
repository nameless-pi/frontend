import { JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelper) { }

  canActivate() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
        // logged in so return true
        return true;
    }
      // not logged in so redirect to login page
    localStorage.removeItem('token');
    this.router.navigate(['']);
    return false;
  }
}
