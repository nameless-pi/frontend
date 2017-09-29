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
    if (form.valid) {
      const sala = form.value.nome;

      this.dbService.cadastrarSala({'nome': sala})
      .subscribe();
    }
    form.reset();
  }
}
