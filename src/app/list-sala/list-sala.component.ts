import { HorariosPipe } from './../pipes/horarios.pipe';
import { DisposableFn } from '@angular/core/src/view';
import { ModalSalaComponent } from './modal-sala/modal-sala.component';
import { ModalHorarioComponent } from './modal-horario/modal-horario.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { DatabaseService } from '../servicos/database.service';



@Component({
  selector: 'app-list-sala',
  templateUrl: './list-sala.component.html',
  styleUrls: ['./list-sala.component.css']
})

export class ListSalaComponent implements OnInit {
  id = -1;
  salas: any = [];
  horarios: any = [];

  constructor(private zone: NgZone, private dbService: DatabaseService, private dialogService: DialogService) {
  }



  ngOnInit() {
    this.getSalas();
  }

  onclick(idx) {
      this.id = idx;
  }

  getSalas() {
    this.dbService.getSalas()
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
      sala: this.salas[id],
    })
      .subscribe((isConfirmed) => {});

  }

  editarHorario(id) {
    const Disposable = this.dialogService.addDialog(ModalHorarioComponent, {
      title: 'Horário - Editar',
      horario: this.salas[this.id].horarios[id],
    })
      .subscribe((isConfirmed) => {});


    }

  deletarHorario(id) {
    console.log(id);
    this.dbService
    .deletarHorario(id)
    .subscribe();
    this.salas[this.id].horarios.splice(id, 1);
  }
}

