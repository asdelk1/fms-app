import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyTypeComponent } from './currency-type/currency-type.component';
import { ListCurrencyTypesComponent } from './currency-type/list-currency-types/list-currency-types.component';
import { ViewCurrencyTypesComponent } from './currency-type/view-currency-types/view-currency-types.component';
import {MasterDataRoutingModule} from './master-data-routing.module';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';
import {ActionModule} from '../../@control/action/action.module';



@NgModule({
  declarations: [
    CurrencyTypeComponent,
    ListCurrencyTypesComponent,
    ViewCurrencyTypesComponent
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    OwerpTableModule,
    OwerpFormModule,
    ActionModule
  ]
})
export class MasterDataModule { }
