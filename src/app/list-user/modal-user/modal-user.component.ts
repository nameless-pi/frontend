import { Router } from '@angular/router';
import { DropdownSettings } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown/multiselect.interface';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { DatabaseService } from '../../servicos/database.service';

export interface ConfirmModel {
  title: string;
  user: any;
  mode: string;
  users: any[];
  index: any;
}

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalUserComponent extends DialogComponent<ConfirmModel, boolean>
  implements ConfirmModel, OnInit {
  title: string;
  user: any;
  salas = [];
  body = {};
  users: any[];
  mode: string;
  index: any;
  dropdownSettings: {
    text: string;
    selectAllText: string;
    unSelectAllText: string;
  };
  dropdownList = [];
  selectedItems = [];
  typeUsers = ['Aluno', 'Professor', 'Servente'];

  // Settings configuration
  mySettings: IMultiSelectSettings = {
    showCheckAll: true,
    showUncheckAll: true,
    isLazyLoad: true,
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 6,
    displayAllSelectedText: true,
    maxHeight: '200px'
  };

  // Text configuration
  myTexts: IMultiSelectTexts = {
    checkAll: 'Marcar todas',
    uncheckAll: 'Desmarcar todas',
    checked: 'Sala selecionada!',
    checkedPlural: 'Salas selecionadas!',
    defaultTitle: 'Selecione as salas',
    allSelected: 'Todas selecionadas!',
  };

  // Labels / Parents
  myOptions: IMultiSelectOption[] = [];
  optionsModel = [];

  constructor(
    private dbService: DatabaseService,
    dialogService: DialogService,
    private router: Router
  ) {
    super(dialogService);
  }

  ngOnInit() {
    this.fillSelect();
  }

  private kickUser() {
    localStorage.removeItem('token');
    this.router
      .navigate([''])
      .then(() => this.close())
      .then(() => alert('Sua sessão expirou, logue novamente!'));
  }

  fillSelect() {
    this.dbService
      .getSalasSelect()
      .then(data => {
        const select = [];
        for (let i = 0; i < data.length; i++) {
          select.push({
            id: data[i].id,
            name: data[i].nome
          });
        }
        this.myOptions = select;
        this.user.direito_acesso.forEach(element => {
          this.optionsModel.push(element.id_sala);
        });
      })
      .catch(err => this.handleError(err.status));
  }

  onSubmit(form) {
    if (form.valid) {
      const user = form.value;
      for (let i = 0; i < this.selectedItems.length; i++) {
        this.salas.push({
          id_sala: this.selectedItems[i].id_sala
        });
      }
      this.body = {
        nome: user.nome,
        tipo: user.tipo,
        email: user.email,
        rfid: user.rfid,
        direito_acesso: this.salas
      };

      this.selectedItems = [];
      this.salas = [];

      if (this.mode === 'Editar') {
        const request = this.dbService.editarRecurso(
          'usuarios',
          user.id,
          this.body
        );
        if (request) {
          request
            .then(res => {
              alert('Usuário alterado com sucesso!');
              this.user = res;
              this.users[this.index] = this.user;
              this.close();
            })
            .catch(err => this.handleError(err.status));
        } else {
          this.kickUser();
        }
      } else {
        const request = this.dbService.criarRecurso('usuarios', this.body);
        if (request) {
          request
            .then(res => {
              this.users.push(res);
              alert('Usuário criado com sucesso!');
              this.close();
            })
            .catch(err => this.handleError(err.status));
        } else {
          this.kickUser();
        }
      }
    }
  }

  private handleError(error: number) {
    if (error === 403) {
      alert('Este email já está cadastrado!');
    } else if (error === 400) {
      alert('Ops, há algo errado nesta página ou configurações do servidor');
    } else if (error === 401) {
      this.close();
      localStorage.removeItem('token');
      this.router.navigate(['']).then(() => {
        alert('Credenciais inválidas');
      });
    } else if (error === 404) {
      alert('Este usuário não existe!');
    } else if (error === 0) {
      alert('Erro de conexão, tente novamente!');
    }
  }
}
