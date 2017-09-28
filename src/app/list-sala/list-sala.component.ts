import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../servicos/database.service';


@Component({
  selector: 'app-list-sala',
  templateUrl: './list-sala.component.html',
  styleUrls: ['./list-sala.component.css']
})

export class ListSalaComponent implements OnInit {
  salas: any = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    this.getSalas();
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
