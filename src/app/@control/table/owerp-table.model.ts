
export interface OwerpTableColumns {
  [columnName: string]: OwerpColumnDefinition;
}

export interface OwerpColumnDefinition {
  title: string;
  type: OwerpTableColumnType;
}

export enum OwerpSelectionMode {
  SINGLE = 'single',
  MULTI = 'multi',
  NONE = 'none'
}

export enum OwerpTableColumnType {
  TEXT = 'string',
  NUMBER = 'number',
  BOOLEAN = 'checkbox'
}
