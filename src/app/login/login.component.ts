import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { routing } from '../app.routing';

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

  constructor() {}
  ngOnInit() {}
}
