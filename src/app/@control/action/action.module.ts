import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action.component';
import {NbButtonModule} from '@nebular/theme';



@NgModule({
    declarations: [
        ActionComponent
    ],
    exports: [
        ActionComponent
    ],
  imports: [
    CommonModule,
    NbButtonModule
  ]
})
export class ActionModule { }
