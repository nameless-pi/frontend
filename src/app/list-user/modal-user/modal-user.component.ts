import { DropdownSettings } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown/multiselect.interface';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { DatabaseService } from '../../servicos/database.service';
import {Observable} from 'rxjs/Observable';
export interface ConfirmModel {
  title: string;
  user: any;
  mode: string;
  users: any[];
  index: any;
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
  salas = [];
  body = {};
  users: any[];
  mode: string;
  index: any;
  dropdownSettings: {text: string; selectAllText: string; unSelectAllText: string; };
  dropdownList = [];
  selectedItems = [];
  typeUsers = ['Aluno', 'Professor', 'Servente'];

  constructor(private dbService: DatabaseService, dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    console.log(this.user);
    this.fillSelect();
    this.dropdownSettings = {
      text: 'Selecione as salas',
      selectAllText: 'Todas',
      unSelectAllText: 'Nenhuma'
    };
    if (this.user.direito_acesso) {
      this.setBeforeSelectedSalas();
    }
  }

  fillSelect() {
    this.dbService.getSalasSelect()
    .map(res => res.json())
    // .catch(this.handleError)
    .subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.dropdownList.push({
          'id': i + 1,
          'itemName': data[i].nome,
          'id_sala': data[i].id
        });
      }
    });
  }

  setBeforeSelectedSalas() {
    for (let i = 0; i < this.user.direito_acesso.length; i++) {
      this.selectedItems.push({
        'id': i + 1,
        'itemName': this.user.direito_acesso[i].nome_sala,
        'id_sala': this.user.direito_acesso[i].id_sala
       });
    }
  }

  onSubmit(form) {
    if (form.valid && !this.btn) {
      const user = form.value;
      for (let i = 0; i < this.selectedItems.length; i++) {
        this.salas.push({
          'id_sala': this.selectedItems[i].id_sala
        });
      }
      this.body = {
        'nome': user.nome,
        'tipo': user.tipo,
        'email': user.email,
        'rfid': user.rfid,
        'direito_acesso': this.salas
      };

      this.selectedItems = [];
      this.salas  = [];

      if (this.mode === 'Editar') {
        this.dbService.editarRecurso('usuarios', user.id, this.body)
        .catch( this.handleError )
        .subscribe(res => {
          this.user = res.json();
          this.users[this.index] = this.user;
        });
      } else {
        this.dbService.criarRecurso('usuarios', this.body)
          .subscribe(res => {
            if (res.status === 201) {
              this.users.push(this.body);
            }
          });
      }
    }
    this.close();
  }

  public handleError(error: any) {
    const errMsg = error.status;
    if (errMsg === 403) {
      alert('Este usuário já existe!');

    } else if (errMsg === 400) {
      alert('Ops, há algo errado nesta página ou configurações do servidor');

    } else if (errMsg === 401) {
      alert('Credenciais inválidas');

    } else if (errMsg === 404) {
      alert('Dado não encontrado!');

    } else if (errMsg === 0) {
      alert('Erro de conexão, tente novamente!');
    }

    return Observable.throw(errMsg);
  }
}
