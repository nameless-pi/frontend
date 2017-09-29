import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
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

  @ViewChild('valuesForm') form: ElementRef;
  selectForm(form){
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.salas.push(this.selectedItems[i].itemName);
    }

    this.forme = {
      "nome": form.nome_user.value,
      "tipo": form.CadastroUsuario.value,
      "email": form.email_user.value,
      "rfid": form.rfid_user.value,
      "salas": this.salas
    };
    console.log(this.forme);
    this.salas = [];
    var c;
    c = this.dbService.cadastrarUsuario(this.forme);
    c.subscribe();
    
    if(c == "201"){
      alert("DEEEUU CERTO");
     
    }else
      alert("tente mais uma vez amiguinho!");
  }
}
