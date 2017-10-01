import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListSalaComponent } from './list-sala/list-sala.component';
import { ListUserComponent } from './list-user/list-user.component';
import { PaginaErroComponent } from './pagina-erro/pagina-erro.component';
import { FormCadSalaComponent } from './form-cad-sala/form-cad-sala.component';
import { FormCadastroComponent } from './form-cadastro/form-cadastro.component';
import { AuthGuardService } from './servicos/auth-guard.service';
import { ModuleWithProviders } from '@angular/core';


const APP_ROUTERS: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'list-sala', component: ListSalaComponent, canActivate: [AuthGuardService] },
  { path: 'list-user', component: ListUserComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro-sala', component: FormCadSalaComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro-usuario', component: FormCadastroComponent, canActivate: [AuthGuardService] },
  { path: '' , component: LoginComponent},
  { path: '**' , component: PaginaErroComponent, canActivate: [AuthGuardService]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTERS);
