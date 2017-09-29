import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DatabaseService } from '../../servicos/database.service';


export interface ConfirmModel {
  title: string;
  user: any;
}

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  user: any;
  dropdownSettings: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; };
  dropdownList = [];
  selectedItems = [];
  typeUsers = ['Aluno', 'Professor', 'Servente'];

  constructor(private dbService: DatabaseService, dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.dbService.getSalasSelect()
    .subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
          this.dropdownList.push({'id': i + 1, 'itemName': data[i].nome});
      }
    });

    for (let i = 0; i < this.user.acessos.length; i++) {
      this.selectedItems.push({'id': i + 1, 'itemName': this.user.acessos[i].nome_sala});
    }

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Selecione as salas',
      selectAllText: 'Todas',
      unSelectAllText: 'Nenhuma',
    };
  }

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }


}
