import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { routing } from '../app.routing';
import { LoginService } from '../servicos/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit() {}

  onSubmit(fLogin) {
    if (fLogin.valid) {
      if (this.loginService.login(fLogin.value.login, fLogin.value.password)) {
        this.router.navigate(['/home']);
      } else {
        fLogin.reset();
      }
    }
  }
}
