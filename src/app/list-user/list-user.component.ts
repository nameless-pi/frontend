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
      .subscribe((data) => {
        this.users.push(data);
      });
  }

  apagarUsuario(id) {
    this.dbService.deleteUsuario(this.users[0][id].id)
      .subscribe();
    this.users[0].splice(id);
  }

  showConfirm(index) {
    const disposable = this.dialogService.addDialog(ModalUserComponent, {
        title: 'Usuário - Editar',
        user: this.users[0][index],
      })
        .subscribe((isConfirmed) => {});
    // setTimeout(() => {
    //   disposable.unsubscribe();
    // }, 10000);
  }
}
