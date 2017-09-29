import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


import { DatabaseService } from '../servicos/database.service';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {
  dropdownSettings: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; };
  dropdownList = [];
  selectedItems = [];
  salas = [];
  forme = {};

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.fillSelect();
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Selecione as salas',
      selectAllText: 'Todas',
      unSelectAllText: 'Nenhuma',
    };
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }

  fillSelect() {
    this.dbService.getSalasSelect().catch(this.handleError)
    .subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
          this.dropdownList.push({'id': i + 1, 'itemName': data[i].nome});
      }
    });
  }

  onSubmit(form) {
    if (form.valid) {
      const user = form.value;
      console.log(user);

      for (let i = 0; i < this.selectedItems.length; i++) {
        this.salas.push(this.selectedItems[i].itemName);
      }

      this.forme = {
        'nome': user.nome,
        'tipo': user.tipo,
        'email': user.email,
        'rfid': user.rfid,
        'salas': this.salas
      };

      console.log(this.forme);

      this.salas = [];
      this.dbService.cadastrarUsuario(this.forme).catch(this.handleError)
      .subscribe()
    }
    form.reset();
  }

  public handleError(error: any) {
    const  errMsg = error.status;
    if ( errMsg === '403' ) {

      alert( 'Este usuário ja existe!' );

    }else if ( errMsg === '400') {

      alert( 'ops, há algo errado nesta página ou configurações do servidor' );

    }else if ( errMsg === '401') {

      alert( 'Login ou senha invalido' );

    }else if ( errMsg === '404') {

      alert( 'Dado não encontrado!' );

    }else if ( errMsg === '0') {
      alert('Erro de conexão, tente novamente!');
    }
  return Observable.throw(errMsg);
  }
}
