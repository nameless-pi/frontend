import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DatabaseService } from './../../servicos/database.service';

export interface ConfirmModel {
  title: string;
  mode: string;
  admin?: any;
  admins: any;
  index?: any;
}

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.component.html',
  styleUrls: ['./modal-admin.component.css']
})
export class ModalAdminComponent extends DialogComponent<ConfirmModel, boolean>
  implements ConfirmModel, OnInit {
  title: string;
  mode: string;
  admin?: any;
  admins: any;
  index?: any;

  constructor(
    dialogService: DialogService,
    private dbService: DatabaseService,
    private router: Router
  ) {
    super(dialogService);
  }

  ngOnInit() {}

  private kickUser() {
    localStorage.removeItem('token');
    this.router
      .navigate([''])
      .then(() => this.close())
      .then(() => alert('Sua sessão expirou, logue novamente!'));
  }

  onSubmit(form) {
    if (form.valid) {
      const { value } = form;
      delete value.id;

      if (this.mode === 'Editar') {
        delete value.password;
        const request = this.dbService.editarRecurso(
          'admins',
          this.admin.id,
          value
        );
        if (request) {
          request
            .then(res => {
              alert('Administrador atualizado com sucesso!');
              this.admins[this.index] = res;
              this.close();
            })
            .catch(err => this.handleError(err.status));
        } else {
          this.kickUser();
        }
      } else if (this.mode === 'Cadastrar') {
        delete value.newPassword;
        delete value.currentPassword;
        const request = this.dbService.criarRecurso('admins', value);
        if (request) {
          request
            .then(res => {
              alert('Administrador criado com sucesso!');
              this.admins.push(res);
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
      alert('Este administrador já existe!');
    } else if (error === 400) {
      alert('Ops, há algo errado nesta página ou configurações do servidor');
    } else if (error === 401) {
      this.close();
      localStorage.removeItem('token');
      this.router.navigate(['']).then(() => {
        alert('Credenciais inválidas');
      });
    } else if (error === 404) {
      alert('Este administrador não existe!');
    } else if (error === 0) {
      alert('Erro de conexão, tente novamente!');
    }
  }
}
