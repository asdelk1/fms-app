import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { ListSupplierTypeComponent } from './type/list-supplier-type/list-supplier-type.component';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import {ActionModule} from '../../@control/action/action.module';
import { ViewSupplierTypeComponent } from './type/view-supplier-type/view-supplier-type.component';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';
import { ListSupplierItemComponent } from './item/list-supplier-item/list-supplier-item.component';
import { ViewSupplierItemComponent } from './item/view-supplier-item/view-supplier-item.component';
import { ListSupplierComponent } from './list-supplier/list-supplier.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';


@NgModule({
  declarations: [
    SupplierComponent,
    ListSupplierTypeComponent,
    ViewSupplierTypeComponent,
    ListSupplierItemComponent,
    ViewSupplierItemComponent,
    ListSupplierComponent,
    CreateSupplierComponent,
    ViewSupplierComponent
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
