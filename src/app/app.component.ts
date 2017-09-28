import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit() {
      this.dropdownList = [
        {'id': 1, 'itemName': 'E100' },
        {'id': 2, 'itemName': 'E101' },
        {'id': 3, 'itemName': 'E102' },
        {'id': 4, 'itemName': 'E103' },
      ];
      this.dropdownSettings = {
        singleSelection: false,
        text: 'Selecione as salas',
        selectAllText: 'Todas',
        unSelectAllText: 'Nenhuma',
      };
  }
}
