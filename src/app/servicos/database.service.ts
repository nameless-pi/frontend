import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';

const APP_SERVER = 'http://localhost:5000/api/v1';

@Injectable()
export class DatabaseService {
  authHttp: AuthHttp;

  constructor(private http: Http) {
    this.authHttp = this.authHttpServiceFactory();
  }

  private authHttpServiceFactory() {
    return new AuthHttp(new AuthConfig({
      tokenName: 'token',
      headerPrefix: 'JWT',
      tokenGetter: (() => localStorage.getItem('token')),
      globalHeaders: [
        {'Content-Type': 'application/json'},
        {'Access-Control-Allow-Origin': '*'}
      ],
    }), this.http);
  }

  getRecurso(recurso) {
    return this.authHttp
      .get(`${APP_SERVER}/${recurso}`);
  }

  getRecursoId(recurso, id) {
    return this.authHttp
      .get(`${APP_SERVER}/${recurso}/${id}`);
  }

  criarRecurso(recurso, body) {
    return this.authHttp
      .post(`${APP_SERVER}/${recurso}`, body);
  }

  editarRecurso(recurso, id, body) {
    return this.authHttp
      .put(`${APP_SERVER}/${recurso}/${id}`, body);
  }

  deletarRecurso(recurso, id) {
    return this.authHttp
      .delete(`${APP_SERVER}/${recurso}/${id}`);
  }

  deletarTodosRecursos(recurso) {
    return this.authHttp
      .delete(`${APP_SERVER}/${recurso}`);
  }

  getSalasSelect() {
    return this.authHttp
      .get(`${APP_SERVER}/json/salas`);
  }
}
