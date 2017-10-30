import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';

import { DatabaseService } from '../servicos/database.service';
import { ModalUserComponent } from './modal-user/modal-user.component';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: any = [];

  constructor(private dbService: DatabaseService, private dialogService: DialogService) { }

  ngOnInit() {
    this.dbService.getRecurso('usuarios')
      .map(res => res.json())
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
      });

  }

  apagarUsuario(id) {
    if (confirm('Você realmente deseja apagar este usuário?')) {
      this.dbService
        .deletarRecurso('usuarios', this.users[id].id)
        .catch(this.handleError)
        .subscribe(res => {
            if ( res.status === 204 ) {
              this.users.splice(id, 1);
              alert('Usuario Apagado com Sucesso!!');
            }
        });
    }
  }

  acessosTransform(acessos: any[]) {
    const tamanho = acessos.length;
    if (!tamanho) {
      return 'Nenhuma';
    } else if (tamanho > 4) {
      return tamanho;
    }

    console.log(acessos);

    let acessosT = '[';

    for (let i = 0; i < tamanho - 1; i++) {
      acessosT += acessos[i].nome_sala + ', ';
    }

    acessosT += acessos[tamanho - 1].nome_sala + ']';

    return acessosT;
  }

  showModal(index, mode = 'Editar') {
    const disposable = this.dialogService.addDialog(ModalUserComponent, {
        title: 'Usuário - ' + mode,
        user: index >= 0 ? this.users[index] : {},
        mode: mode,
        users: this.users,
        index: index
      })
        .subscribe((isConfirmed) => {});
  }

  deletarTodos() {
    if (confirm('Deseja realmente apagar todos usuários?')) {
      this.dbService.deletarTodosRecursos('usuarios')
        .catch(this.handleError)
        .subscribe(res => {
          if (res.status === 204) {
            alert('Todos Usuarios apagados com sucesso!');
            this.users = [];
          }
        });
    }
  }



  public handleError(error: any) {
    const errMsg = error.status;
    if (errMsg === 403) {
      alert('Este usuário já existe!');

    } else if (errMsg === 400) {
      alert('Ops, há algo errado nesta página ou configurações do servidor');

    } else if (errMsg === 401) {
      alert('Credenciais inválidas');

    } else if (errMsg === 404) {
      alert('Usuário não Existe!');

    } else if (errMsg === 0) {
      alert('Erro de conexão, tente novamente!');
    }

    return Observable.throw(errMsg);
  }
}
