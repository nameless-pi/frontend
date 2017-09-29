import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DatabaseService } from './../servicos/database.service';

@Component({
  selector: 'app-form-cad-sala',
  templateUrl: './form-cad-sala.component.html',
  styleUrls: ['./form-cad-sala.component.css']
})
export class FormCadSalaComponent implements OnInit {
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {}

  onSubmit(form) {
    console.log(form);
  }

  cadastrar(sala) {
    if (sala.value.nome_sala.length === 4) {
      this.dbService.cadastrarSala({'nome': sala.value.nome_sala})
      .subscribe();
    } else {
      alert('O nome da sala só pode ter 4 caracteres, tente novamente.');
    }
  }
}
