import {RouterModule, Routes} from '@angular/router';
import {ListJournalEntriesComponent} from './journal/list-journal-entries/list-journal-entries.component';
import {NgModule} from '@angular/core';
import {CreateJournalEntryComponent} from './journal/create-journal-entry/create-journal-entry.component';

const routes: Routes = [
  {path: 'journal-entries', component: ListJournalEntriesComponent},
  {path: 'journal-entries/create', component: CreateJournalEntryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
