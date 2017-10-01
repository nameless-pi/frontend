import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DatabaseService } from '../servicos/database.service';


@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormCadastroComponent implements OnInit {
  dropdownSettings: { text: string; selectAllText: string; unSelectAllText: string; };
  dropdownList = [];
  selectedItems = [];
  salas = [];
  forme = {};

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.fillSelect();
    this.dropdownSettings = {
      text: 'Selecione as salas',
      selectAllText: 'Todas',
      unSelectAllText: 'Nenhuma',
    };
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

  onSubmit(form) {
    if (form.valid) {
      const user = form.value;

      for (let i = 0; i < this.selectedItems.length; i++) {
        this.salas.push({
          'id': this.selectedItems[i].id_sala
        });
      }

      this.forme = {
        'nome': user.nome,
        'tipo': user.tipo,
        'email': user.email,
        'rfid': user.rfid,
        'direito_acesso': this.salas
      };

      this.salas = [];
      this.dbService
        .cadastrarUsuario(this.forme)
        .catch(this.handleError)
        .subscribe();
    }
    form.reset();
    this.selectedItems = [];
  }

  public handleError(error: any) {
    const  errMsg = error.status;
    if ( errMsg === 403 ) {

      alert( 'Este usuário ja existe!' );

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
}
