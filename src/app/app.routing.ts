import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListSalaComponent } from './list-sala/list-sala.component';
import { ListUserComponent } from './list-user/list-user.component';
import { PaginaErroComponent } from './pagina-erro/pagina-erro.component';
import { FormCadSalaComponent } from './form-cad-sala/form-cad-sala.component';
import { FormCadastroComponent } from './form-cadastro/form-cadastro.component';

/*Naaaaaaaaaaaaaao mudar a ordem dos caminhos*/

const APP_ROUTERS: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'list-sala', component: ListSalaComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'form-cad-sala', component: FormCadSalaComponent },
  { path: 'form-cadastro', component: FormCadastroComponent },
  { path: '' , component: LoginComponent},
  { path: '**' , component: PaginaErroComponent}
  

];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTERS);
