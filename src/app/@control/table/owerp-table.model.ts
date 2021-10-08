
export interface OwerpTableColumn {
  [columnName: string]: OwerpColumnDefinition;
}

export interface OwerpColumnDefinition {
  title: string;
  type: string;
}

export enum OwerpTableSelectionMode {
  SINGLE = 'single',
  MULTI = 'multi'
}

export enum OwerpTableColumnType {
  TEXT = 'string',
  NUMBER = 'number'
}
