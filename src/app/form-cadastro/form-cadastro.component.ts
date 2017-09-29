import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../servicos/database.service';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {
  dropdownSettings: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; };
  dropdownList = [];
  selectedItems = [];
  salas = [];
  forme = {};

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.fillSelect();
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Selecione as salas',
      selectAllText: 'Todas',
      unSelectAllText: 'Nenhuma',
    };
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }

  fillSelect() {
    this.dbService.getSalasSelect()
    .subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
          this.dropdownList.push({'id': i + 1, 'itemName': data[i].nome});
      }
    });
  }

  onSubmit(form) {
    if (form.valid) {
      const user = form.value;

      for (let i = 0; i < this.selectedItems.length; i++) {
        this.salas.push(this.selectedItems[i].itemName);
      }

      this.forme = {
        'nome': user.nome,
        'tipo': user.tipo,
        'email': user.email,
        'rfid': user.rfid,
        'salas': this.salas
      };

      this.salas = [];
      this.dbService.cadastrarUsuario(this.forme)
      .subscribe();
    }
    form.reset();
  }
}
