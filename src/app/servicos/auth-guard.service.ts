import { JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelper) {}

  canActivate() {
    const token = localStorage.getItem('token');
    const flag = localStorage.getItem('flag');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else if (
      flag != null ||
      (token && this.jwtHelper.isTokenExpired(token))
    ) {
      if (flag) {
        alert('Administrador logado removido!');
        localStorage.removeItem('flag');
      } else {
        alert('Sua sessão expirou, logue novamente!');
      }
      localStorage.removeItem('token');
      this.router.navigate(['']);
    }
    return false;
  }
}
