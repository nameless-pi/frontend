import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  admins = [{nome: 'admin', login: 'admin'}];
  constructor() { }

  ngOnInit() {
  }

  showModal(index) {

  }

  apagarAdmin(index) {

  }
}
