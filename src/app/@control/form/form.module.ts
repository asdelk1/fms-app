import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {
  NbActionsModule, NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule, NbIconModule,
  NbInputModule, NbRadioModule, NbSelectModule, NbToggleModule,
  NbUserModule
} from '@nebular/theme';
import {FormsRoutingModule} from '../../pages/forms/forms-routing.module';



@NgModule({
  declarations: [
    FormComponent
  ],
  exports: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbBadgeModule,
    NbToggleModule
  ]
})
export class FormModule { }
