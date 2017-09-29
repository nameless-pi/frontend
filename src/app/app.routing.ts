import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListSalaComponent } from './list-sala/list-sala.component';
import { ListUserComponent } from './list-user/list-user.component';
import { PaginaErroComponent } from './pagina-erro/pagina-erro.component';
import { FormCadSalaComponent } from './form-cad-sala/form-cad-sala.component';
import { FormCadastroComponent } from './form-cadastro/form-cadastro.component';

const APP_ROUTERS: Routes = [
  { path: '' , component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'list-sala', component: ListSalaComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'cadastro-sala', component: FormCadSalaComponent },
  { path: 'cadastro-usuario', component: FormCadastroComponent },

  { path: '**' , component: PaginaErroComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTERS);
