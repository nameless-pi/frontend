import { FormsModule } from '@angular/forms';
import { DatabaseService } from './../../servicos/database.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import {Observable} from 'rxjs/Observable';

export interface ConfirmModel {
  title: string;
  sala: any;
  salas: any[];
  mode: string;
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
  salas: any[];
  mode: string;
  btn = true;

  constructor(dialogService: DialogService, private dbService: DatabaseService) {
    super(dialogService);
  }

  ngOnInit() {}

  onSubmit(formModalSala) {
    if (formModalSala.touched && formModalSala.valid && formModalSala.dirty && this.btn === true ) {

      this.sala.nome = formModalSala.value.nome_sala;
      this.alterarSala(this.sala);
    }
  }

  alterarSala(sala) {
    if (this.mode === 'Editar') {
      this.dbService
      .editarRecurso('salas', sala.id, {'nome': this.sala.nome})
      .catch(this.handleError)
      .subscribe();
    } else {
      this.dbService.criarRecurso('salas', {'nome': this.sala.nome})
        .subscribe(res => {
          if (res.status === 201) {
            this.salas.push(res.json());
          }
        });
    }
      this.close();
  }

  public handleError(error: any) {
    const  errMsg = error.status;
    if (errMsg === 403) {
      alert('Esta sala já existe!');

    } else if (errMsg === 400) {
      alert('Ops! Há algo errado nesta página ou no servidor');

    } else if (errMsg === 401) {
      alert('Credenciais inválidas');

    } else if (errMsg === 404) {
      alert('Dado não existente!');

    } else if ( errMsg === 0) {
      alert('Erro de conexão, tente novamente!');

    } else {
      alert('Sala cadastrada com sucesso!');
    }
    // window.location.reload();
    return Observable.throw(errMsg);
  }
}
