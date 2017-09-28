import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { LoginComponent } from './login/login.component';
import { FormCadastroComponent } from './form-cadastro/form-cadastro.component';
import { HomeComponent } from './home/home.component';
import { ListSalaComponent} from './list-sala/list-sala.component';
import { ListUserComponent} from './list-user/list-user.component';
import { FormCadSalaComponent } from './form-cad-sala/form-cad-sala.component';
import { AcessosPipe } from './pipes/acessos.pipe';
import { HorariosPipe } from './pipes/horarios.pipe';
import { ModalUserComponent } from './list-user/modal-user/modal-user.component';
import { DatabaseService } from './servicos/database.service';


const appRoutes: Routes = [
  { path: 'form-cadastro', component: FormCadastroComponent },
  { path: 'list-sala', component: ListSalaComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'form-cad-sala', component: FormCadSalaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormCadastroComponent,
    HomeComponent,
    ListSalaComponent,
    ListUserComponent,
    FormCadSalaComponent,
    AcessosPipe,
    HorariosPipe,
    ModalUserComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AngularMultiSelectModule,
    BootstrapModalModule.forRoot({container: document.body}),
    RouterModule.forRoot(
      appRoutes, { enableTracing: true}
    )
  ],
  entryComponents: [ModalUserComponent],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
