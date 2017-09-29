import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCadastroComponent } from './form-cadastro/form-cadastro.component';
import { ListSalaComponent } from './list-sala/list-sala.component';
import { ListUserComponent } from './list-user/list-user.component';
import { FormCadSalaComponent } from './form-cad-sala/form-cad-sala.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PaginaErroComponent } from './pagina-erro/pagina-erro.component';

const APP_ROUTERS: Routes = [
    { path: 'form-cadastro', component: FormCadastroComponent },
    { path: 'list-sala', component: ListSalaComponent },
    { path: 'list-user', component: ListUserComponent },
    { path: 'form-cad-sala', component: FormCadSalaComponent },
    { path: 'home', component: HomeComponent },
    { path: '' , component: LoginComponent},
    { path: '**' , component: PaginaErroComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTERS);