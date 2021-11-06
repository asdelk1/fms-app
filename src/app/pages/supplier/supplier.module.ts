import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { ListSupplierTypeComponent } from './type/list-supplier-type/list-supplier-type.component';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import {ActionModule} from '../../@control/action/action.module';
import { ViewSupplierTypeComponent } from './type/view-supplier-type/view-supplier-type.component';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';


@NgModule({
  declarations: [
    SupplierComponent,
    ListSupplierTypeComponent,
    ViewSupplierTypeComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    OwerpTableModule,
    ActionModule,
    OwerpFormModule
  ]
})
export class SupplierModule { }
