import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../servicos/database.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})

export class PesquisaComponent implements OnInit {
  pesquisa: any = [];
  salas:  any = [];
  horarios: any = [];
  usuarios: any = [];
  nomeSala = 'false';
 
  constructor(
    private dbService: DatabaseService,
    private dialogService: DialogService,
    private router: Router ) { 
      
    }
 

  ngOnInit() {
     
  }

  onPesquisa(valor) {
    this.dbService.getRecurso('salas')
    .then(data => this.salas = data)

    this.dbService.getRecurso('usuarios')
    .then(data => this.usuarios = data)

    
  } 

}
