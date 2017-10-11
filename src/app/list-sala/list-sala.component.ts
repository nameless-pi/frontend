import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HorariosPipe } from './../pipes/horarios.pipe';

import { ModalSalaComponent } from './modal-sala/modal-sala.component';
import { ModalHorarioComponent } from './modal-horario/modal-horario.component';

import { DialogService } from 'ng2-bootstrap-modal';
import { DatabaseService } from '../servicos/database.service';


@Component({
  selector: 'app-list-sala',
  templateUrl: './list-sala.component.html',
  styleUrls: ['./list-sala.component.css']
})

export class ListSalaComponent implements OnInit {
  @ViewChild('button') btn: ElementRef;
  id = -1;
  salas: any = [];
  horarios: any = [];

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
      .subscribe();
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
        .subscribe();
      this.salas[this.id].horarios.splice(id, 1);
    }
  }

  deletarTodos(recurso, id = -1) {
    if (recurso === 'horarios' && confirm('Deseja realmente apagar todos os horários ?')) {
      this.dbService.deletarRecurso('salas/horarios', id)
        .subscribe(res => {
          if (res.status === 204) {
            this.horarios = [];
          }
        });
    } else if (confirm('Deseja realmente apagar todas as salas?')) {
      this.dbService.deletarTodosRecursos(recurso)
        .subscribe(res => {
          if (res.status === 204) {
            this.salas = [];
          }
        });
    }
  }
}

