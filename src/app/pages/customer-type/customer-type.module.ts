import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerTypeRoutingModule } from './customer-type-routing.module';
import { CustomerTypeComponent } from './customer-type.component';
import { ListTypesComponent } from './list-types/list-types.component';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import { CustomerTypeDetailsComponent } from './details/customer-type-details.component';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';


@NgModule({
  declarations: [
    CustomerTypeComponent,
    ListTypesComponent,
    CustomerTypeDetailsComponent
  ],
  imports: [
    CommonModule,
    CustomerTypeRoutingModule,
    OwerpTableModule,
    OwerpFormModule
  ]
})
export class CustomerTypeModule { }
