import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesInvoiceComponent } from './sales-invoice.component';
import { ListSalesInvoiceComponent } from './list-sales-invoice/list-sales-invoice.component';
import {SalesInvoiceRoutingModule} from './sales-invoice-routing.module';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';
import {ActionModule} from '../../@control/action/action.module';
import { CreateSalesInvoiceComponent } from './create-sales-invoice/create-sales-invoice.component';
import {NbButtonModule, NbCardModule, NbStepperModule} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddItemComponent } from './create-sales-invoice/add-item/add-item.component';
import {CreateSalesInvoiceService} from './create-sales-invoice/create-sales-invoice.service';



@NgModule({
  declarations: [
    SalesInvoiceComponent,
    ListSalesInvoiceComponent,
    CreateSalesInvoiceComponent,
    AddItemComponent
  ],
  imports: [
    CommonModule,
    SalesInvoiceRoutingModule,
    OwerpTableModule,
    OwerpFormModule,
    ActionModule,
    NbStepperModule,
    NbCardModule,
    ReactiveFormsModule,
    NbButtonModule,
    FormsModule
  ]
})
export class SalesInvoiceModule { }
