import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class LoginDisabledService implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelper) {}

  canActivate() {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.router.navigate(['home']);
      return this.jwtHelper.isTokenExpired(token);
    }
    return true;
  }
}
