export interface OwerpFormModel {
  name: string;
  label: string;
  size?: string;
  type: string;
  canEdit: boolean;
  required?: boolean;
  autoComplete?: OwerpAutoCompleteOption;
}

export interface OwerpAutoCompleteDataModel {
  [name: string]: any[];
}

export interface OwerpAutoCompleteOption {
  label: string;
  value: string;
}

export enum OwerpFormFieldType {
  TEXT = 'text',
  BOOLEAN = 'boolean',
  AUTOCOMPLETE = 'autocomplete'
}

export enum OwerpFormFieldSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg'
}
