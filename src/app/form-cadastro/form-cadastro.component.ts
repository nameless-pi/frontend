import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
}
