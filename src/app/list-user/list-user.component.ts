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
    this.dbService.getUsuarios()
      .map(res => res.json())
      .subscribe((data) => this.users = data);
  }

  apagarUsuario(id) {
    this.dbService
      .deleteUsuario(this.users[id].id)
      .subscribe();
    this.users.splice(id, 1);
  }

  showConfirm(index) {
    const disposable = this.dialogService.addDialog(ModalUserComponent, {
        title: 'Usuário - Editar',
        user: this.users[index],
      })
        .subscribe((isConfirmed) => {});
    // setTimeout(() => {
    //   disposable.unsubscribe();
    // }, 10000);
  }
}
