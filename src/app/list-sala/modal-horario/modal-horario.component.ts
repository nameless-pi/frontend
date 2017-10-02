import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DatabaseService } from './../../servicos/database.service';
import { Observable } from 'rxjs/Observable';

export interface ConfirmModel {
  title: string;
  horario: any;
  tipo: string;
  buttonText: string;
  salaId: number;
}

@Component({
  selector: 'app-modal-horario',
  templateUrl: './modal-horario.component.html',
  styleUrls: ['./modal-horario.component.css']
})
export class ModalHorarioComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  horario: any;
  tipo: string;
  buttonText: string;
  salaId: number;

  typeUsers = ['aluno', 'professor', 'servente'];
  dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
  btn = true;
  body = {};

  constructor( dialogService: DialogService, private dbService: DatabaseService) {
    super(dialogService);
  }

  ngOnInit() {}

  onSubmit(formModalHora) {
    if (formModalHora.value.horarioFim < formModalHora.value.horarioInicio) {
        alert ('Horário inválido, tente novamente!');
        this.btn = false;
        this.close();
    }
    if (formModalHora.touched && formModalHora.valid && formModalHora.dirty && this.btn === true) {
      this.body = {
        'hora_inicio' : formModalHora.value.horarioInicio,
        'hora_fim' : formModalHora.value.horarioFim,
        'dia' : formModalHora.value.dia,
        'id_sala': this.salaId,
        'tipo_user' : formModalHora.value.tipo
      };

      console.log(this.body);
      if (this.tipo === 'editar') {
        this.editarHorario(this.horario.id, this.body);
      } else if (this.tipo === 'novo') {
        this.cadastrarHorario(this.body);
        this.horario.push(this.body);
      }
    }
  }

  cadastrarHorario(body) {
    this.dbService.cadastrarHorario(body)
      .catch(this.handleError)
      .subscribe();
      this.close();
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
    if (errMsg === 403) {
      alert('Este horário já existe!');

    } else if (errMsg === 400) {
      alert('Ops! Há algo errado nesta página ou no servidor');

    } else if (errMsg === 401) {
      alert('Login ou senha inválida');

    } else if (errMsg === 404) {
      alert('Dado não existente!');

    } else if ( errMsg === 0) {
      alert('Erro de conexão, tente novamente!');

    } else {
      alert('Horário cadastrado com sucesso!');
    }

    return Observable.throw(errMsg);
  }
}
