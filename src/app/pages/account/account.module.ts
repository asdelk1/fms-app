import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListJournalEntriesComponent } from './journal/list-journal-entries/list-journal-entries.component';
import {AccountRoutingModule} from './account-routing.module';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';
import {ActionModule} from '../../@control/action/action.module';
import { CreateJournalEntryComponent } from './journal/create-journal-entry/create-journal-entry.component';
import {NbButtonModule, NbCardModule, NbDialogModule, NbStepperModule, NbTabsetModule} from '@nebular/theme';
import { AddAccountComponent } from './journal/create-journal-entry/add-account/add-account.component';
import { ListStandingEntriesComponent } from './journal/list-standing-entries/list-standing-entries.component';
import { ViewJournalEntryComponent } from './journal/view-journal-entry/view-journal-entry.component';
import { JournalEntryOperationComponent } from './journal/journal-entry-operation/journal-entry-operation.component';



@NgModule({
  declarations: [
    ListJournalEntriesComponent,
    CreateJournalEntryComponent,
    AddAccountComponent,
    ListStandingEntriesComponent,
    ViewJournalEntryComponent,
    JournalEntryOperationComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    OwerpTableModule,
    OwerpFormModule,
    ActionModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbDialogModule,
    NbTabsetModule
  ]
})
export class AccountModule { }
