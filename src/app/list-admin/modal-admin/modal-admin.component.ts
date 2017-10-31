import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DatabaseService } from './../../servicos/database.service';
import { Observable } from 'rxjs/Observable';

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
  styleUrls: ['./modal-admin.component.css'],
})
export class ModalAdminComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  mode: string;
  admin?: any;
  admins: any;
  index?: any;

  constructor(dialogService: DialogService, private dbService: DatabaseService) {
    super(dialogService);
  }

  ngOnInit() {}

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  onSubmit(form) {
    if (form.valid) {
      const { value } = form;
      delete value.id;

      if (this.mode === 'Editar') {
        delete value.password;
        this.dbService.editarRecurso('admins', this.admin.id, value)
          .catch(this.handleError)
          .subscribe(res => {
            if (res.status === 200) {
              alert('Administrador atualizado com sucesso!');
              this.admins[this.index] = res.json();
              this.close();
            }
          });

      } else if (this.mode === 'Cadastrar') {
        delete value.newPassword;
        delete value.currentPassword;
        this.dbService.criarRecurso('admins', value)
          .catch(this.handleError)
          .subscribe(res => {
            if (res.status === 201) {
              alert('Administrador criado com sucesso!');
              this.admins.push(res.json());
              this.close();
            }
          });
      }
    }
  }

  public handleError(error: any) {
    const  errMsg = error.status;
    if (errMsg === 403) {
      alert('Este login já existe!');

    } else if (errMsg === 400) {
      alert('Ops! Há algo errado nesta página ou no servidor');

    } else if (errMsg === 401) {
      alert('Credenciais inválidas');

    } else if (errMsg === 404) {
      alert('Dado não existente!');

    } else if (errMsg === 0) {
      alert('Erro de conexão, tente novamente!');
    } else if (errMsg === 412) {
      alert('A senha atual está incorreta!');
    }
    // window.location.reload();
    return Observable.throw(errMsg);
  }
}
