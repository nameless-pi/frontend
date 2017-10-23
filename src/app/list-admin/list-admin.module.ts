import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from '../home/home.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ListAdminComponent } from './list-admin.component';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    TooltipModule.forRoot()
  ],
  declarations: [ListAdminComponent],
  exports: [ListAdminComponent]
})
export class ListAdminModule { }
