import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeModule } from '../home/home.module';

import { TooltipModule } from 'ngx-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { ListUserComponent } from './list-user.component';
import { ModalUserComponent } from './modal-user/modal-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeModule,
    AngularMultiSelectModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    ListUserComponent,
    ModalUserComponent,
  ],
  exports: [
    ListUserComponent,
    ModalUserComponent
  ],
  entryComponents: [ModalUserComponent]
})
export class ListUserModule { }
