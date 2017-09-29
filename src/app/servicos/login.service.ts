import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/map';

const APP_SERVER = 'http://localhost:5000';
const USERNAME = 'admin';
const PASSWORD = 'admin';

@Injectable()
export class LoginService {

  constructor(private http: Http, private authHttp) {
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

  login() {
    const body = {
      'username': USERNAME,
      'password': PASSWORD
    };

    this.http
      .post(`${APP_SERVER}/auth`, body)
      .map((response: Response) => response.json())
      .subscribe((data) => {

        const token = data.access_token;
        localStorage.setItem('token', token);
      });
  }

  get() {
    this.authHttp
      .get(`${APP_SERVER}/api/v1/users`)
      .subscribe();
  }
}
