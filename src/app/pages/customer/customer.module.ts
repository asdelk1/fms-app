import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ListCustomerItemsComponent } from './items/list-customer-items/list-customer-items.component';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import {ActionModule} from '../../@control/action/action.module';
import { DetailCustomerItemsComponent } from './items/detail-customer-items/detail-customer-items.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';


@NgModule({
  declarations: [
    CustomerComponent,
    ListCustomerItemsComponent,
    DetailCustomerItemsComponent,
    ListCustomerComponent,
    CreateCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    OwerpFormModule,
    OwerpTableModule,
    ActionModule,
  ]
})
export class CustomerModule { }
