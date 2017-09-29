import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const APP_SERVER = 'http://localhost:5000/api/v1';

@Injectable()
export class DatabaseService {

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario) {
    return this.http
      .post(`${APP_SERVER}/users`, usuario);
  }

  getUsuarios() {
    return this.http
      .get(`${APP_SERVER}/users`);
  }

  editarUsuario(id, user) {
    return this.http
      .put(`${APP_SERVER}/users/${id}`, user);
  }

  deleteUsuario(id) {
    return this.http
      .delete(`${APP_SERVER}/users/${id}`);
  }

  getSalasSelect() {
    return this.http
      .get(`${APP_SERVER}/json/salas`);
  }

  getSalas() {
    return this.http
      .get(`${APP_SERVER}/salas`);
  }

  cadastrarSala(nome) {
    return this.http
      .post(`${APP_SERVER}/salas`, nome);
  }

  deletarSala(nome) {
    return this.http
      .delete(`${APP_SERVER}/salas/${nome}`);
  }
}
