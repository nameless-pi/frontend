import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/map';

const APP_SERVER = 'http://localhost:5000';

@Injectable()
export class LoginService {
  authHttp: AuthHttp;

  constructor(private http: Http) {
    this.authHttp = this.authHttpServiceFactory(this.http);
  }

  private authHttpServiceFactory(http: Http) {
    return new AuthHttp(new AuthConfig({
      tokenName: 'token',
      headerPrefix: 'JWT',
      tokenGetter: (() => localStorage.getItem('token')),
      globalHeaders: [
        {'Content-Type': 'application/json'},
        {'Access-Control-Allow-Origin': '*'}
      ],
    }), http);
  }

  login(username, password) {
    this.http
      .post(`${APP_SERVER}/auth`, {
        'username': username,
        'password': password
      })
      .map((response: Response) => response.json())
      .subscribe((data) => {
        const token = data.access_token;
        localStorage.setItem('token', token);
      });
  }
}
