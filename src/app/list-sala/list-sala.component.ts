import { ModalSalaComponent } from './modal-sala/modal-sala.component';
import { ModalHorarioComponent } from './modal-horario/modal-horario.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../servicos/database.service';



@Component({
  selector: 'app-list-sala',
  templateUrl: './list-sala.component.html',
  styleUrls: ['./list-sala.component.css']
})

export class ListSalaComponent implements OnInit {
  id = -1;
  salas: any = [];

  constructor(private dbService: DatabaseService, private dialogService: DialogService, ) {}

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
    this.salas.splice(index);
  }

  editarSala(id) {
    const disposable = this.dialogService.addDialog(ModalSalaComponent, {
      title: 'Horário - Editar',
      sala: this.salas[id],
    })
      .subscribe((isConfirmed) => {});

  }
}
