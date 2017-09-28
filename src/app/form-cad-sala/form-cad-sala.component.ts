import { DatabaseService } from './../servicos/database.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-cad-sala',
  templateUrl: './form-cad-sala.component.html',
  styleUrls: ['./form-cad-sala.component.css']
})
export class FormCadSalaComponent implements OnInit {
  @ViewChild('sala') btn: ElementRef;

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
  }

  cadastrar(sala) {
    if (sala.length === 4) {
      this.dbService.cadastrarSala({'nome': sala})
      .subscribe();
    } else {}
  }
}
