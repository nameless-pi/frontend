import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./modal-horario.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalHorarioComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  horario: any;
  tipo: string;
  buttonText: string;
  salaId: number;

  typeUsers = ['Aluno', 'Professor', 'Servente'];
  dias = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
  btn = true;
  body = {};

  myTime = new Date();
  ismeridian = false;

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
    this.dbService.criarRecurso('horarios', body)
      .catch(this.handleError)
      .subscribe( res => {
        if (res.status === 201) {
          alert('Horário Cadastrado Com Sucesso');
          this.close();
        }
      });
  }

  editarHorario(id, body) {
      this.dbService
        .editarRecurso('horarios', id, body)
        .catch(this.handleError)
        .subscribe(res => {
          if (res.status === 200) {
            alert('Horário Alterado Com Sucesso!');
            this.close();
          }
        });
  }

  public handleError(error: any) {
    const  errMsg = error.status;
    if (errMsg === 403) {
      alert('Este horário já existe!');

    } else if (errMsg === 400) {
      alert('Ops! Há algo errado nesta página ou no servidor');

    } else if (errMsg === 401) {
      alert('Credenciais inválidas');

    } else if (errMsg === 404) {
      alert('Dado não existente!');

    } else if (errMsg === 0) {
      alert('Erro de conexão, tente novamente!');

    }
    // window.location.reload();
    return Observable.throw(errMsg);
  }
}
