import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListJournalEntriesComponent } from './journal/list-journal-entries/list-journal-entries.component';
import {AccountRoutingModule} from './account-routing.module';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';
import {ActionModule} from '../../@control/action/action.module';
import { CreateJournalEntryComponent } from './journal/create-journal-entry/create-journal-entry.component';
import {NbButtonModule, NbCardModule, NbDialogModule, NbStepperModule} from '@nebular/theme';
import { AddAccountComponent } from './journal/create-journal-entry/add-account/add-account.component';



@NgModule({
  declarations: [
    ListJournalEntriesComponent,
    CreateJournalEntryComponent,
    AddAccountComponent
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
    NbDialogModule
  ]
})
export class AccountModule { }
