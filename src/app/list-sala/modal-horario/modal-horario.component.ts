import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DatabaseService } from './../../servicos/database.service';
import {Observable} from 'rxjs/Observable';

export interface ConfirmModel {
  title: string;
  horario: any;
}

@Component({
  selector: 'app-modal-horario',
  templateUrl: './modal-horario.component.html',
  styleUrls: ['./modal-horario.component.css']
})
export class ModalHorarioComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
         title: string;
         horario: any;
         typeUsers = ['aluno', 'professor', 'servente'];
         dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
         btn = true;
         body = {};

  constructor( dialogService: DialogService, private dbService: DatabaseService) {
    super(dialogService);
  }

  ngOnInit() {
  }

  onSubmit(formModalHora) {
       if  (formModalHora.value.horarioFim < formModalHora.value.horarioInicio) {
          alert ('horairo invalido, tente novamente!');
          this.btn = false;
          this.close();
      }
      if (formModalHora.touched && formModalHora.valid && formModalHora.dirty && this.btn === true) {

        this.body = {
          'hora_inicio' : formModalHora.value.horarioInicio,
          'hora_fim' : formModalHora.value.horarioFim,
          'dia' : formModalHora.value.dia,
          'tipo_user' : formModalHora.value.tipo
        };

        console.log(this.body);
        this.editarHorario(this.horario.id, this.body);
      }

  }

  editarHorario(id, body) {
      this.dbService
        .editarHorario(id, body)
        .catch(this.handleError)
        .subscribe();
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
}
