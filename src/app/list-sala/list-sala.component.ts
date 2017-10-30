import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ModalSalaComponent } from './modal-sala/modal-sala.component';
import { ModalHorarioComponent } from './modal-horario/modal-horario.component';

import { DialogService } from 'ng2-bootstrap-modal';
import { DatabaseService } from '../servicos/database.service';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-list-sala',
  templateUrl: './list-sala.component.html',
  styleUrls: ['./list-sala.component.css']
})

export class ListSalaComponent implements OnInit {
  @ViewChild('button') btn: ElementRef;
  id = -1;
  salas: any = [];

  constructor(
    private dbService: DatabaseService,
    private dialogService: DialogService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.getSalas();
  }

  onclick(idx) {
    const classes = this.btn.nativeElement.children[idx].className.split(' ');
    if (classes.indexOf('active') === -1) {
      this.btn.nativeElement.children[idx].className += ' active';
      for (let i = 0; i < this.btn.nativeElement.children.length; i++) {
        if (i !== idx) {
          this.btn.nativeElement.children[i].className = 'btn list-group-item li_sala';
        }
      }
    }
    if (idx === this.id) {
      this.btn.nativeElement.children[idx].className = 'btn list-group-item li_sala';
      this.id = -1;
    } else {
      this.id = idx;
    }
  }

  getSalas() {
    this.dbService.getRecurso('salas')
      .map(res => res.json())
      .subscribe(data => this.salas = data);
  }

  deletarSala(index) {
    if (confirm('Você realmente deseja apagar esta sala?')) {
      this.dbService.deletarRecurso('salas', this.salas[index].id)
      .catch(this.handleError)
      .subscribe( res => {
        if ( res.status === 204) {
          alert('Sala Excluida com Sucesso!');
          this.salas.splice(index, 1);
          this.id = -1;
        }
      });
      this.salas.splice(index, 1);
      this.id = -1;
    }
  }

  showModal(id, mode = 'Editar') {
    const disposable = this.dialogService.addDialog(ModalSalaComponent, {
      title: 'Sala - ' + mode,
      sala: id >= 0 ? this.salas[id] : {},
      salas: this.salas,
      mode: mode
    })
      .subscribe((isConfirmed) => {});

  }

  novoHorario() {
    const Disposable = this.dialogService.addDialog(ModalHorarioComponent, {
      tipo: 'novo',
      title: 'Horário - Cadastro',
      buttonText: 'Cadastrar',
      salaId: this.salas[this.id].id,
      horario: this.salas[this.id].horarios
    })
      .subscribe((isConfirmed) => {});
  }

  editarHorario(id) {
    const Disposable = this.dialogService.addDialog(ModalHorarioComponent, {
      tipo: 'editar',
      title: 'Horário - Editar',
      buttonText: 'Editar',
      salaId: this.salas[this.id].id,
      horario: this.salas[this.id].horarios[id]
    })
      .subscribe((isConfirmed) => {});
    }

  deletarHorario(id, id_horario) {
    console.log(id);
    if (confirm('Você realmente deseja apagar este horário?')) {
      this.dbService
        .deletarRecurso('horarios', id_horario)
        .catch(this.handleErrorH)
        .subscribe(res => {
          if (res.status === 204) {
            alert('Hoario Excluido com Sucesso!');
            this.salas[this.id].horarios.splice(id, 1);
          }
        });
    }
  }

  deletarTodos(recurso, id = -1) {
    if (recurso === 'horarios' && confirm('Deseja realmente apagar todos os horários ?')) {
      this.dbService.deletarRecurso('salas/horxarios', this.salas[id].id)
        .catch(this.handleErrorH)
        .subscribe(res => {
          if (res.status === 204) {
            alert('Todos Horários Excluidos Com Sucesso!');
            this.salas[id].horarios = [];
          }
        });
    } else if (confirm('Deseja realmente apagar todas as salas?')) {
      this.dbService.deletarTodosRecursos(recurso)
        .catch(this.handleError)
        .subscribe(res => {
          if (res.status === 204) {
            alert('Salas Excluidas Com Sucesso!');
            this.salas = [];
          }
        });
    }
  }


  public handleError(error: any) {
    const errMsg = error.status;
    if (errMsg === 403) {
      alert('Esta Sala já existe!');

    } else if (errMsg === 400) {
      alert('Ops, há algo errado nesta página ou configurações do servidor');

    } else if (errMsg === 401) {
      alert('Credenciais inválidas');

    } else if (errMsg === 404) {
      alert('Sala não Existe!');

    } else if (errMsg === 0) {
      alert('Erro de conexão, tente novamente!');
    }

    return Observable.throw(errMsg);
  }

  public handleErrorH(error: any) {
    const errMsg = error.status;
    if (errMsg === 403) {
      alert('Este Horário já existe!');

    } else if (errMsg === 400) {
      alert('Ops, há algo errado nesta página ou configurações do servidor');

    } else if (errMsg === 401) {
      alert('Credenciais inválidas');

    } else if (errMsg === 404) {
      alert('Horário não Existe!');

    } else if (errMsg === 0) {
      alert('Erro de conexão, tente novamente!');
    }

    return Observable.throw(errMsg);
  }

}

