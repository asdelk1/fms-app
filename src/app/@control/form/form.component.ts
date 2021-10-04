import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {OwerpFormModel} from './owerp-form.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OwerpActionModel} from '../action/owerp-action.model';

@Component({
  selector: 'ngx-owerp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  @Input()
  public title: string;
  @Input()
  public fields: OwerpFormModel[];
  @Input()
  public actions: OwerpActionModel[];
  @Input()
  public data: any;
  @Input()
  public canEdit: boolean = true;
  @Output()
  public submit: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public reset: EventEmitter<void> = new EventEmitter<void>();

  public formGroup: FormGroup;

  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.render();
    }
  }

  private render(): void {
    if (this.fields && this.fields.length > 0) {
      const formControls: { [key: string]: any } = {};
      this.fields.forEach((f: OwerpFormModel) => {
        formControls[f.name] = this.fb.control(this.getData(f.name), Validators.required);
      });
      this.formGroup = this.fb.group(formControls);
    }
  }

  public getData(field: string): string {
    return this.data && this.data[field] !== undefined ? this.data[field] : '';
  }

  public getWidth(size: string): string {
    let colCssClass: string = 'col-sm-';
    switch (size) {
      case 'lg':
        colCssClass += '12';
        break;
      case 'md':
        colCssClass += '6';
        break;
      default:
        colCssClass += 3;
    }
    return colCssClass;
  }

  public onSubmit(): void {
    this.submit.emit(this.formGroup.value);
  }

  public onReset(): void {
    this.reset.emit();
  }

}
