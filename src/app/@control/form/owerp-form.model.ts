export interface OwerpFormModel {
  name: string;
  label: string;
  size?: string;
  type: string;
  canEdit: boolean;
  required?: boolean;
  autoComplete?: string;
  groupName?: string;
  valueChange?: (data: any, state?: any) => void;
}

export interface OwerpAutoCompleteDataModel {
  [name: string]: any[];
}

export interface OwerpEnumDataModel {
  [name: string]: OwerpLabelValueModel[];
}

export interface OwerpLabelValueModel {
  label: string;
  value: string;
}

export enum OwerpFormFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  AUTOCOMPLETE = 'autocomplete',
  RADIO = 'radio',
  DATE = 'date'
}

export enum OwerpFormFieldSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg'
}
