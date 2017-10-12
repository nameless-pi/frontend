import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';

import { DatabaseService } from '../servicos/database.service';
import { ModalUserComponent } from './modal-user/modal-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: any = [];

  constructor(private dbService: DatabaseService, private dialogService: DialogService) { }

  ngOnInit() {
    this.dbService.getRecurso('usuarios')
      .map(res => res.json())
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
      });

  }

  apagarUsuario(id) {
    if (confirm('Você realmente deseja apagar este usuário?')) {
      this.dbService
        .deletarRecurso('usuarios', this.users[id].id)
        .subscribe();
      this.users.splice(id, 1);
    }
  }

  showModal(index, mode = 'Editar') {
    const disposable = this.dialogService.addDialog(ModalUserComponent, {
        title: 'Usuário - ' + mode,
        user: index >= 0 ? this.users[index] : {},
        mode: mode,
        users: this.users
      })
        .subscribe((isConfirmed) => {});
  }

  deletarTodos() {
    if (confirm('Deseja realmente apagar todos usuários?')) {
      this.dbService.deletarTodosRecursos('usuarios')
        .subscribe(res => {
          if (res.status === 204) {
            this.users = [];
          }
        });
    }
  }
}
