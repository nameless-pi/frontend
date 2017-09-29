import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../servicos/database.service';

@Component({
  selector: 'app-list-sala',
  templateUrl: './list-sala.component.html',
  styleUrls: ['./list-sala.component.css']
})

export class ListSalaComponent implements OnInit {
  id = -1;
  salas = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    this.getSalas();
  }

  onclick(nome) {
    for (let i = 0; i < this.salas[0].length; i++) {
      if (this.salas[0][i].nome === nome) {
        this.id = i;
        return;
      }
    }
    return -1;
  }

  getSalas() {
    this.dbService.getSalas()
      .subscribe(data => this.salas.push(data));
  }

  deletarSala(index) {
    this.dbService.deletarSala(this.salas[0][index].nome)
      .subscribe();
    this.salas[0].splice(index);
  }
}
