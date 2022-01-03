import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  OwerpAutoCompleteDataModel,
  OwerpEnumDataModel,
  OwerpFormFieldType,
  OwerpFormModel,
  OwerpLabelValueModel
} from './owerp-form.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OwerpActionModel} from '../action/owerp-action.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ngx-owerp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public title: string;
  @Input()
  public fields: OwerpFormModel[];
  @Input()
  public autoCompleteData: OwerpAutoCompleteDataModel;
  @Input()
  public actions: OwerpActionModel[];
  @Input()
  public data: any | any[];
  @Input()
  public canEdit: boolean = true;
  @Input()
  public enumData: OwerpEnumDataModel = {};
  @Input()
  public showCard: boolean = true;
  @Input()
  public saveLabel: string = 'Save';
  @Input()
  public cancelLabel: string = 'Cancel';
  @Input()
  public disableCancel: boolean = false;
  @Input()
  public patchData: any;
  @Output()
  public saveData: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public cancelForm: EventEmitter<void> = new EventEmitter<void>();

  public formGroup: FormGroup;

  private stopAutoCompleteListeners: Subject<void> = new Subject();
  public autoCompleteOptionsChanges: { [name: string]: Subject<OwerpLabelValueModel[]> } = {};
  // public autoCompleteOptions$: Observable<Array<OwerpLabelValueModel>> =
  //   this.autoCompleteOptionsChange.asObservable();

  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['autoCompleteData'] || changes['enumData']) {
      this.render();
    }

    if (changes['patchData']) {
      this.formGroup.patchValue(this.patchData);
    }
  }

  ngOnDestroy(): void {
    this.stopAutoCompleteListeners.next(null);
  }

  private render(): void {
    if (this.fields && this.fields.length > 0) {
      const formControls: { [key: string]: any } = {};
      this.fields.forEach((f: OwerpFormModel) => {
        const data: any = this.getData(f);
        const control: FormControl = this.fb.control(data, f.required ? Validators.required : undefined);
        this.autoCompleteOptionsChanges[f.name] = new Subject<OwerpLabelValueModel[]>();
        control.valueChanges.pipe(
          takeUntil(this.stopAutoCompleteListeners.asObservable())
        ).subscribe(
          (value: string) => {
            if (f.type === OwerpFormFieldType.AUTOCOMPLETE) {
              this.filterAutoComplete(f, value);
            } else if (f.valueChange) {
              f.valueChange(value, this.formGroup.value);
            }
          }
        );

        formControls[f.name] = control;
      });
      this.formGroup = this.fb.group(formControls);
    }
  }

  public getData(field: OwerpFormModel): string {
    if (field.type === OwerpFormFieldType.BOOLEAN) {
      return this.data && this.data[field.name] ? 'true' : 'false';
    } else if (field.type === OwerpFormFieldType.AUTOCOMPLETE) {
      return this.data && this.data[field.name] && field.autoComplete ? this.data[field.name][field.autoComplete] : '';
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

    if (this.autoCompleteData && Object.keys(this.autoCompleteData).length > 0) {
      Object.keys(this.autoCompleteData).forEach(
        (complexType: string) => {
          if (data[complexType] !== undefined || data[complexType] !== null) {
            const typeId: number = +data[complexType];
            data[complexType] = {id: typeId};
          } else {
            data[complexType] = {};
          }
        }
      );
    }
    this.saveData.emit(data);
  }

  public onReset(): void {
    this.cancelForm.emit();
  }

  private filterAutoComplete(field: OwerpFormModel, value: any): OwerpLabelValueModel[] {
    let filteredOptions: OwerpLabelValueModel[] = [];
    if (this.autoCompleteData && this.autoCompleteData[field.name]) {
      filteredOptions = this.autoCompleteData[field.name]
        .filter((option: OwerpLabelValueModel) => {
          if (!value) {
            return true;
          }

          const label: string = `${option.label}`;
          const strValue: string = `${value}`;
          return label.toLowerCase().includes(strValue.toLowerCase());
        });
      const emitter: Subject<OwerpLabelValueModel[]> = this.getAutoCompleteOptionChangeEmitter(field.name);
      emitter.next(filteredOptions);
    }
    return filteredOptions;
  }

  public getAutoCompleteLabel(field: OwerpFormModel): (value: any) => string {
    return (value: any) => {

      if (!this.autoCompleteData || !this.autoCompleteData[field.name]) {
        return value;
      }

      let label: string = value;
      const autoCompleteData: OwerpLabelValueModel[] = this.autoCompleteData[field.name];
      const record: OwerpLabelValueModel | undefined =
        autoCompleteData.find((d: OwerpLabelValueModel) => d.value === value);
      if (record) {
        label = record.label;
      }
      return label;
    };
  }

  public getEnumEntries(field: OwerpFormModel): OwerpLabelValueModel[] {
    return this.enumData || Object.keys(this.enumData).length > 0 ? this.enumData[field.name] : [];
  }

  public getAutoCompleteOptionChangeEmitter(fieldName: string): Subject<OwerpLabelValueModel[]> {
    if (this.autoCompleteOptionsChanges[fieldName]) {
      return this.autoCompleteOptionsChanges[fieldName];
    }
  }

  public onAutoCompleteValueChange(field: OwerpFormModel, data: string): void {
    if (field.valueChange && data !== '') {
      field.valueChange(data, this.formGroup.value);
    }
  }

  public isReadOnlySelect(field: OwerpFormModel) {
    if (field.type !== 'select') {
      return false;
    }
    return !this.canEdit || (this.canEdit && !field.canEdit);
  }
}
