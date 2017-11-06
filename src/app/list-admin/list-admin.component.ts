import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal/dist';

import { DatabaseService } from '../servicos/database.service';
import { ModalAdminComponent } from './modal-admin/modal-admin.component';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  admins = [];
  constructor(
    private dbService: DatabaseService,
    private dialogService: DialogService,
    private jwtHelper: JwtHelper,
    private router: Router
  ) {}

  ngOnInit() {
    this.dbService
      .getRecurso('admins')
      .then(res => (this.admins = res))
      .catch(err => this.handleError(err.status));
  }

  showModal(index, mode = 'Editar') {
    if (this.dbService.checkToken()) {
      localStorage.removeItem('token');
      this.router
        .navigate([''])
        .then(() => alert('Sua sessão expirou, logue novamente!'));
      return;
    }
    const disposable = this.dialogService
      .addDialog(ModalAdminComponent, {
        title: 'Administrador - ' + mode,
        admin: index >= 0 ? this.admins[index] : {},
        admins: this.admins,
        index: index,
        mode: mode
      })
      .subscribe(isConfirmed => {});
  }

  apagarAdmin(index) {
    const { id } = this.admins[index];
    if (confirm('Você deseja apagar este administrador?')) {
      this.dbService.deletarRecurso('admins', id).then(() => {
        const token = localStorage.getItem('token');
        const { identity } = this.jwtHelper.decodeToken(token);
        alert('Administrador removido com sucesso!');
        this.admins.splice(index, 1);
        if (identity === id) {
          localStorage.setItem('flag', 'MnsyBscAShMB251Sz%3');
          localStorage.removeItem('token');
        }
      });
    }
  }

  private handleError(error: number) {
    if (error === 403) {
      alert('Este administrador já existe!');
    } else if (error === 400) {
      alert('Ops, há algo errado nesta página ou configurações do servidor');
    } else if (error === 401) {
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
