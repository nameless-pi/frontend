import { DropdownSettings } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown/multiselect.interface';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { DatabaseService } from '../../servicos/database.service';
import {Observable} from 'rxjs/Observable';
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
  salas = [];
  body = {};
  dropdownSettings: {text: string; selectAllText: string; unSelectAllText: string; };
  dropdownList = [];
  selectedItems = [];
  typeUsers = ['aluno', 'professor', 'servente'];

  constructor(private dbService: DatabaseService, dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.fillSelect();
    this.dropdownSettings = {
      text: 'Selecione as salas',
      selectAllText: 'Todas',
      unSelectAllText: 'Nenhuma'
    };
    this.setBeforeSelectedSalas();
  }



  fillSelect() {
    this.dbService.getSalasSelect()
    .map(res => res.json())
    .catch(this.handleError)
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
      this.dbService.editarUsuario(user.id, this.body)
        .catch( this.handleError )
        .subscribe();
    }
    this.close();
  }

  public handleError(error: any) {
    const  errMsg = error.status;
    if ( errMsg === 403 ) {

      alert( 'Esta sala ja existe!' );

    }else if ( errMsg === 400) {

      alert( 'ops, há algo errado nesta página ou configurações do servidor' );

    }else if ( errMsg === 401) {

      alert( 'Login ou senha invalido' );

    }else if ( errMsg === 404) {

      alert( 'Dado não encontrado!' );

    }else if ( errMsg === 0) {
      alert('Erro de conexão, tente novamente!');
    }
  return Observable.throw(errMsg);
  }

  // confirm() {
  //   // we set dialog result as true on click on confirm button,
  //   // then we can get dialog result from caller code
  //   this.result = true;
  //   this.close();
  // }
}
