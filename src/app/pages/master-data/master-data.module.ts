import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyTypeComponent } from './currency-type/currency-type.component';
import { ListCurrencyTypesComponent } from './currency-type/list-currency-types/list-currency-types.component';
import { ViewCurrencyTypesComponent } from './currency-type/view-currency-types/view-currency-types.component';
import {MasterDataRoutingModule} from './master-data-routing.module';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';
import {ActionModule} from '../../@control/action/action.module';
import { ListPaymentMethodsComponent } from './payment-method/list-payment-methods/list-payment-methods.component';
import { ViewPaymentMethodsComponent } from './payment-method/view-payment-methods/view-payment-methods.component';
import { MasterDataComponent } from './master-data.component';
import { ViewPaymentTermsComponent } from './payment-terms/view-payment-terms/view-payment-terms.component';
import { ListPaymentTermsComponent } from './payment-terms/list-payment-terms/list-payment-terms.component';



@NgModule({
  declarations: [
    CurrencyTypeComponent,
    ListCurrencyTypesComponent,
    ViewCurrencyTypesComponent,
    ListPaymentMethodsComponent,
    ViewPaymentMethodsComponent,
    MasterDataComponent,
    ViewPaymentTermsComponent,
    ListPaymentTermsComponent
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