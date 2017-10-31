import {Component, OnInit} from '@angular/core';
import {DialogService} from 'ng2-bootstrap-modal/dist';

import {DatabaseService} from '../servicos/database.service';
import {ModalAdminComponent} from './modal-admin/modal-admin.component';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  admins = [];
  constructor(
    private dbService: DatabaseService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.dbService.getRecurso('admins')
      .subscribe(res => {
        if (res.status === 200) {
          this.admins = res.json();
        }
      });
  }

  showModal(index, mode = 'Editar') {
    const disposable = this.dialogService
      .addDialog(ModalAdminComponent, {
        title: 'Administrador - ' + mode,
        admin: index >= 0 ? this.admins[index] : {},
        admins: this.admins,
        index: index,
        mode: mode
      })
      .subscribe(isConfirmed => {});
  }

  apagarAdmin(index) {
    console.log(index);

    if (confirm('Você deseja apagar este administrador?')) {
      this.dbService.deletarRecurso('admins', this.admins[index].id)
        .subscribe(res => {
          if (res.status === 204) {
            alert('Administrador removido com sucesso!');
            this.admins.splice(index, 1);
          }
        });
    }
  }
}
