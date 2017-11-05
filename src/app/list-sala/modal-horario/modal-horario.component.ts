import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DatabaseService } from './../../servicos/database.service';
import { Observable } from 'rxjs/Observable';

export interface ConfirmModel {
  title: string;
  horarios: any;
  index: number;
  tipo: string;
  buttonText: string;
  salaId: any;
}

@Component({
  selector: 'app-modal-horario',
  templateUrl: './modal-horario.component.html',
  styleUrls: ['./modal-horario.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalHorarioComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  tipo: string;
  buttonText: string;
  salaId: any;
  horarios: any;
  index: number;
  horario: any;

  typeUsers = ['Aluno', 'Professor', 'Servente'];
  dias = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
  btn = true;
  body = {};

  myTime = new Date();
  ismeridian = false;

  constructor(
    dialogService: DialogService,
    private dbService: DatabaseService,
    private router: Router
  ) {
    super(dialogService);
  }

  ngOnInit() {
    this.horario = this.index !== undefined ? this.horarios[this.index] : {};
  }

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
      .then(res => {
        alert('Horário cadastrado com sucesso');
        this.horarios.push(res);
        this.close();
      })
      .catch(err => this.handleError(err.status));
  }

  editarHorario(id, body) {
    this.dbService
      .editarRecurso('horarios', id, body)
      .then(res => {
        alert('Horário alterado com sucesso!');
        this.horarios[this.index] = res;
        this.close();
      })
      .catch(err => this.handleError(err.status));
  }

  private handleError(error: number) {
    if (error === 403) {
      alert('Este horário já existe!');
    } else if (error === 400) {
      alert('Ops, há algo errado nesta página ou configurações do servidor');
    } else if (error === 401) {
      this.close();
      localStorage.removeItem('token');
      this.router.navigate([''])
        .then(() => {
          alert('Credenciais inválidas');
        });
    } else if (error === 404) {
      alert('Este horário não existe!');
    } else if (error === 0) {
      alert('Erro de conexão, tente novamente!');
    }
  }
}
