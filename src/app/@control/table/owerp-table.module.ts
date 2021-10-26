import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionModule} from '../action/action.module';
import {TableComponent} from './table.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbBadgeModule, NbCardModule} from '@nebular/theme';
import { OwerpBooleanColumnComponent } from './owerp-boolean-column/owerp-boolean-column.component';


@NgModule({
  declarations: [
    TableComponent,
    OwerpBooleanColumnComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    ActionModule,
    NbCardModule,
    NbBadgeModule,
    Ng2SmartTableModule
  ]
})
export class OwerpTableModule { }
