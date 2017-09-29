import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: Router;
  model: any = {};
  loading = false;
  error = '';

  constructor() {

   }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['/abre-home']);
  }
}
