export interface OwerpFormModel {
  name: string;
  label: string;
  size?: string;
  type: string;
  canEdit: boolean;
  required?: boolean;
}

export enum OwerpFormFieldType {
  TEXT = 'text',
  BOOLEAN = 'boolean'
}

export enum OwerpFormFieldSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg'
}
