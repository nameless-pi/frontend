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
  bool = false;

  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit() {}

  async onSubmit(fLogin) {
    if (fLogin.valid) {
      this.bool = await this.loginService.login(fLogin.value.login, fLogin.value.password);
      if (this.bool) {
        this.router.navigate(['/home']);
      }
      fLogin.reset();
    }
  }
}
