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

  cadastrarUsuario(usuario) {
    return this.authHttp
      .post(`${APP_SERVER}/users`, usuario);
  }

  getUsuarios() {
    return this.authHttp
      .get(`${APP_SERVER}/users`);
  }

  editarUsuario(id, user) {
    return this.authHttp
      .put(`${APP_SERVER}/users/${id}`, user);
  }

  editarSala(id, nome) {
    return this.authHttp
      .put(`${APP_SERVER}/salas/${id}`, nome);
  }
  deleteUsuario(id) {
    return this.authHttp
      .delete(`${APP_SERVER}/users/${id}`);
  }

  getSalasSelect() {
    return this.authHttp
      .get(`${APP_SERVER}/json/salas`);
  }

  getSalas() {
    return this.authHttp
      .get(`${APP_SERVER}/salas`);
  }

  cadastrarSala(nome) {
    return this.authHttp
      .post(`${APP_SERVER}/salas`, nome);
  }

  deletarSala(id) {
    return this.authHttp
      .delete(`${APP_SERVER}/salas/${id}`);
  }

  deletarHorario(idHorario) {
    return this.authHttp
      .delete(`${APP_SERVER}/horarios/${idHorario}`);
  }

  editarHorario(id, horario) {
    return this.authHttp
      .put( `${APP_SERVER}/horarios/${id}`, horario );
  }
}
