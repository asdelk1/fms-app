import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {OwerpFormFieldType, OwerpFormModel} from './owerp-form.model';
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
  public data: any | any[];
  @Input()
  public canEdit: boolean = true;
  @Output()
  public saveData: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public cancelForm: EventEmitter<void> = new EventEmitter<void>();

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
        formControls[f.name] = this.fb.control(this.getData(f), f.required ? Validators.required : undefined);
      });
      this.formGroup = this.fb.group(formControls);
    }
  }

  public getData(field: OwerpFormModel): string {
    if (field.type === OwerpFormFieldType.BOOLEAN) {
      return this.data && this.data[field.name] ? 'true' : 'false';
    }
    return this.data && this.data[field.name] !== undefined ? this.data[field.name] : '';
  }

  public getWidth(size: string | undefined): string {
    if (size === undefined) {
      return 'col-sm-3';
    }

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
    const data: Object = this.data && this.data['id'] ?
      Object.assign({id: this.data['id']}, this.formGroup.value) : this.formGroup.value;
    this.saveData.emit(data);
  }

  public onReset(): void {
    this.cancelForm.emit();
  }

}
