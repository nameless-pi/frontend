import { FormsModule } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { DatabaseService } from '../../servicos/database.service';

export interface ConfirmModel {
  title: string;
  user: any;
}

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalUserComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  user: any;
  btn = false;

  dropdownSettings: {text: string; selectAllText: string; unSelectAllText: string; };
  dropdownList = [];
  selectedItems = [];
  typeUsers = ['aluno', 'professor', 'servente'];

  constructor(private dbService: DatabaseService, dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.dbService.getSalasSelect()
    .map(res => res.json())
    .subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
          this.dropdownList.push({
            'id': i + 1,
            'itemName': data[i].nome,
            'id_sala': data[i].id
          });
      }
    });

    for (let i = 0; i < this.user.direito_acesso.length; i++) {
      this.selectedItems.push({
        'id': i + 1,
        'itemName': this.user.direito_acesso[i].nome_sala,
        'id_sala': this.user.direito_acesso[i].id_sala
      });
    }

    this.dropdownSettings = {
      text: 'Selecione as salas',
      selectAllText: 'Todas',
      unSelectAllText: 'Nenhuma'
    };
  }

  onSubmit(form) {
    if (form.valid && !this.btn) {
      const user = form.value;
      let body = {};
      this.user.direito_acesso = [];

      for (let i = 0; i < this.selectedItems.length; i++) {
        this.user.direito_acesso.push({
          'id_sala': this.selectedItems[i].id_sala
        });
      }

      body = {
        'nome': user.nome,
        'tipo': user.tipo,
        'email': user.email,
        'rfid': user.rfid,
        'salas': this.user.direito_acesso
      };

      this.dbService.editarUsuario(user.id, body)
        .subscribe();
    }
    this.close();
  }

  // confirm() {
  //   // we set dialog result as true on click on confirm button,
  //   // then we can get dialog result from caller code
  //   this.result = true;
  //   this.close();
  // }
}
