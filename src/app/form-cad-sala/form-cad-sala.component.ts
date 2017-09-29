import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DatabaseService } from './../servicos/database.service';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-form-cad-sala',
  templateUrl: './form-cad-sala.component.html',
  styleUrls: ['./form-cad-sala.component.css']
})
export class FormCadSalaComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }
  ngOnInit() {}

  onSubmit(form) {
    if (form.valid) {
      const sala = form.value.nome;

      this.dbService.cadastrarSala({'nome': sala}).catch(this.handleError).catch(this.handleError)
      .subscribe();
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
