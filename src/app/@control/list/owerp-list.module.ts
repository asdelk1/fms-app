import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwerpListComponent } from './owerp-list.component';
import {NbCardModule, NbListModule} from '@nebular/theme';



@NgModule({
  declarations: [
    OwerpListComponent
  ],
  exports: [
    OwerpListComponent
  ],
  imports: [
    CommonModule,
    NbListModule,
    NbCardModule
  ]
})
export class OwerpListModule { }
