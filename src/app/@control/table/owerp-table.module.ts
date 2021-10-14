import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionModule} from '../action/action.module';
import {TableComponent} from './table.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbCardModule} from '@nebular/theme';


@NgModule({
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    ActionModule,
    NbCardModule,
    Ng2SmartTableModule
  ]
})
export class OwerpTableModule { }
