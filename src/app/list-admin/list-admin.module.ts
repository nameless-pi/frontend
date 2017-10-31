import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeModule} from '../home/home.module';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import {ListAdminComponent} from './list-admin.component';
import {ModalAdminComponent} from './modal-admin/modal-admin.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    FormsModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    ListAdminComponent,
    ModalAdminComponent
  ],
  entryComponents: [ModalAdminComponent],
  exports: [ListAdminComponent, ModalAdminComponent]
})
export class ListAdminModule {}
