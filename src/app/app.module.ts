import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { routing } from './app.routing';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListUserComponent} from './list-user/list-user.component';
import { ListSalaComponent} from './list-sala/list-sala.component';
import { PaginaErroComponent } from './pagina-erro/pagina-erro.component';
import { ModalUserComponent } from './list-user/modal-user/modal-user.component';
import { ModalSalaComponent } from './list-sala/modal-sala/modal-sala.component';
import { ModalHorarioComponent } from './list-sala/modal-horario/modal-horario.component';

import { DatabaseService } from './servicos/database.service';
import { AcessosPipe } from './pipes/acessos.pipe';
import { HorariosPipe } from './pipes/horarios.pipe';

import { JwtHelper } from 'angular2-jwt';

import { LoginService } from './servicos/login.service';
import { AuthGuardService } from './servicos/auth-guard.service';
import { LoginDisabledService } from './servicos/login-disabled.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListSalaComponent,
    ListUserComponent,
    AcessosPipe,
    HorariosPipe,
    ModalUserComponent,
    PaginaErroComponent,
    ModalSalaComponent,
    ModalHorarioComponent
  ],
  imports: [
    routing,
    HttpModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AngularMultiSelectModule,
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    BootstrapModalModule.forRoot({container: document.body})
  ],
  entryComponents: [ModalHorarioComponent, ModalSalaComponent, ModalUserComponent],
  providers: [
    DatabaseService,
    LoginService,
    AuthGuardService,
    JwtHelper,
    LoginDisabledService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
