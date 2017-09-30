import { DatabaseService } from './../../servicos/database.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import {Observable} from 'rxjs/Observable';

export interface ConfirmModel {
  title: string;
  sala: any;
}

@Component({
  selector: 'app-modal-sala',
  templateUrl: './modal-sala.component.html',
  styleUrls: ['./modal-sala.component.css']
})
export class ModalSalaComponent extends DialogComponent<ConfirmModel, boolean>
  implements ConfirmModel, OnInit {
  title: string;
  sala: any;

  constructor(dialogService: DialogService, private dbService: DatabaseService) {
    super(dialogService);
  }

  ngOnInit() {
  }

  onSubmit(formModalSala) {
    if (formModalSala.touched && formModalSala.valid) {
      this.sala.nome = formModalSala.value.nome_sala;
      this.alterarSala(this.sala);
    }
  }

  alterarSala(sala) {
      this.dbService
        .editarSala(sala.id, {'nome': this.sala.nome}).catch(this.handleError)
        .subscribe();
      this.close();
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
