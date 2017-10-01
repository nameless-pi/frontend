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

  navigate() {
    this.router.navigate(['/cadastro-sala']);
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
    this.dbService.getSalas()
      .map(res => res.json())
      .subscribe(data => this.salas = data);
  }

  deletarSala(index) {
    this.dbService.deletarSala(this.salas[index].id)
      .subscribe();
    this.salas.splice(index, 1);
    this.id = -1;
  }

  editarSala(id) {
    const disposable = this.dialogService.addDialog(ModalSalaComponent, {
      title: 'Sala - Editar',
      sala: this.salas[id]
    })
      .subscribe((isConfirmed) => {});

  }

  novoHorario() {
    const Disposable = this.dialogService.addDialog(ModalHorarioComponent, {
      title: 'Horário - Cadastro',
      horario: this.salas[this.id].horarios,
      buttonText: 'Cadastrar',
      tipo: 'novo',
      salaId: this.salas[this.id].id
    })
      .subscribe((isConfirmed) => {});
  }

  editarHorario(id) {
    const Disposable = this.dialogService.addDialog(ModalHorarioComponent, {
      title: 'Horário - Editar',
      horario: this.salas[this.id].horarios[id],
      buttonText: 'Editar',
      tipo: 'editar'
    })
      .subscribe((isConfirmed) => {});
    }

  deletarHorario(id, id_horario) {
    console.log(id);
    this.dbService
      .deletarHorario(id_horario)
      .subscribe();
    this.salas[this.id].horarios.splice(id, 1);
  }
}

