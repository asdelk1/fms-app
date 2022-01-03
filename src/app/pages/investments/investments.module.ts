import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';
import {ActionModule} from '../../@control/action/action.module';
import { ListInvestmentTypesComponent } from './types/list-investment-types/list-investment-types.component';
import {InvestmentsRoutingModule} from './investments-routing.module';
import { ViewInvestmentTypeComponent } from './types/view-investment-type/view-investment-type.component';



@NgModule({
  declarations: [
    ListInvestmentTypesComponent,
    ViewInvestmentTypeComponent
  ],
  imports: [
    CommonModule,
    InvestmentsRoutingModule,
    OwerpTableModule,
    OwerpFormModule,
    ActionModule,
  ]
})
export class InvestmentsModule { }
