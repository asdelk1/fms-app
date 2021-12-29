import {RouterModule, Routes} from '@angular/router';
import {ListJournalEntriesComponent} from './journal/list-journal-entries/list-journal-entries.component';
import {NgModule} from '@angular/core';
import {CreateJournalEntryComponent} from './journal/create-journal-entry/create-journal-entry.component';
import {ListStandingEntriesComponent} from './journal/list-standing-entries/list-standing-entries.component';
import {ViewJournalEntryComponent} from './journal/view-journal-entry/view-journal-entry.component';

const routes: Routes = [
  {path: 'journal-entries', component: ListJournalEntriesComponent},
  {path: 'journal-entries/create', component: CreateJournalEntryComponent},
  {path: 'journal-entries/view/:id', component: ViewJournalEntryComponent},
  {path: 'journal-entries/standing', component: ListStandingEntriesComponent},
  {
    path: 'journal-entries/standing/view/:id',
    component: CreateJournalEntryComponent,
    data: {type: 'standing', mode: 'update'}
  },
  {
    path: 'journal-entries/to-check',
    component: ListJournalEntriesComponent,
    data: {type: 'book-entry', mode: 'to-check'}
  },
  {
    path: 'journal-entries/to-check/view/:id',
    component: ViewJournalEntryComponent,
    data: {type: 'book-entry', mode: 'to-check'}
  },
  {
    path: 'journal-entries/to-approve',
    component: ListJournalEntriesComponent,
    data: {type: 'book-entry', mode: 'to-approve'}
  },
  {
    path: 'journal-entries/to-approve/view/:id',
    component: ViewJournalEntryComponent,
    data: {type: 'book-entry', mode: 'to-approve'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
