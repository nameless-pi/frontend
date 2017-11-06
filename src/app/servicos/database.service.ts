import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Http } from '@angular/http';

const APP_SERVER = 'http://localhost:5000/api/v1';

@Injectable()
export class DatabaseService {
  authHttp: AuthHttp;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper,
    private router: Router
  ) {
    this.authHttp = this.authHttpServiceFactory();
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  private kickUser() {
    localStorage.removeItem('token');
    this.router
      .navigate([''])
      .then(() => alert('Sua sessão expirou, logue novamente!'));
  }

  private authHttpServiceFactory() {
    return new AuthHttp(
      new AuthConfig({
        tokenName: 'token',
        headerPrefix: 'JWT',
        tokenGetter: () => localStorage.getItem('token'),
        globalHeaders: [
          { 'Content-Type': 'application/json' },
          { 'Access-Control-Allow-Origin': '*' }
        ]
      }),
      this.http
    );
  }

  getRecurso(recurso) {
    if (!this.checkToken()) {
      return this.authHttp
        .get(`${APP_SERVER}/${recurso}`)
        .map(res => res.json())
        .toPromise();
    } else {
      this.kickUser();
    }
  }

  getRecursoId(recurso, id) {
    if (!this.checkToken()) {
      return this.authHttp
        .get(`${APP_SERVER}/${recurso}/${id}`)
        .map(res => res.json())
        .toPromise();
    } else {
      this.kickUser();
    }
  }

  criarRecurso(recurso, body) {
    if (!this.checkToken()) {
      return this.authHttp
        .post(`${APP_SERVER}/${recurso}`, body)
        .map(res => res.json())
        .toPromise();
    } else {
      return null;
    }
  }

  editarRecurso(recurso, id, body) {
    if (!this.checkToken()) {
      return this.authHttp
        .put(`${APP_SERVER}/${recurso}/${id}`, body)
        .map(res => res.json())
        .toPromise();
    } else {
      return null;
    }
  }

  deletarRecurso(recurso, id) {
    if (!this.checkToken()) {
      return this.authHttp
        .delete(`${APP_SERVER}/${recurso}/${id}`)
        .map(res => res.json())
        .toPromise();
    } else {
      this.kickUser();
    }
  }

  deletarTodosRecursos(recurso) {
    if (!this.checkToken()) {
      return this.authHttp
        .delete(`${APP_SERVER}/${recurso}`)
        .map(res => res.json())
        .toPromise();
    } else {
      this.kickUser();
    }
  }

  getSalasSelect() {
    if (!this.checkToken()) {
      return this.authHttp
        .get(`${APP_SERVER}/json/salas`)
        .map(res => res.json())
        .toPromise();
    } else {
      return null;
    }
  }

  checkToken() {
    return this.jwtHelper.isTokenExpired(this.getToken());
  }
}
