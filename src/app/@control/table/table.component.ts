import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {
  OwerpColumnDefinition,
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpSelectionMode
} from './owerp-table.model';
import {OwerpActionModel} from '../action/owerp-action.model';
import {OwerpBooleanColumnComponent} from './owerp-boolean-column/owerp-boolean-column.component';

@Component({
  selector: 'ngx-owerp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  public title: string;

  @Input()
  public data: any[];

  @Input()
  public columns: OwerpTableColumns = {};

  @Input()
  public actions: OwerpActionModel[];

  @Input()
  public selectionMode: OwerpSelectionMode = OwerpSelectionMode.SINGLE;

  @Input()
  public hideCard: boolean = false;

  @Input()
  public disableCreate: boolean = false;

  @Output()
  public create: EventEmitter<void> = new EventEmitter<void>();

  public settings: any = {};
  public source: LocalDataSource = new LocalDataSource();
  public selectedRecords: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.initTable();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data']) {
      this.source = new LocalDataSource(this.data);
      this.selectedRecords = [];
    }

    if (changes['columns']) {
      this.initTable();
    }

  }

  private initTable(): void {
    const tableSettings: any = {
      selectMode: this.selectionMode === OwerpSelectionMode.MULTI ? 'multi' : 'single',
      mode: 'external',
      add: {
        addButtonContent: '<i class="nb-plus"></i>'
      },
      actions: {
        add: !this.disableCreate,
        enable: false,
        edit: false,
        delete: false
      }
    };

    tableSettings['columns'] = this.getTableColumns();
    this.settings = tableSettings;
  }

  public onCreate(): void {
    this.create.emit();
  }

  public onUserRowSelect(rows: any[]): void {
    this.selectedRecords = rows['selected'];
  }

  public isVisible(model: OwerpActionModel): boolean {

    if (!model.mode) {
      return false;
    }

    let isMatchedSelectionType: boolean;
    let result: boolean;

    if (model.mode && model.mode === OwerpSelectionMode.NONE) {
      isMatchedSelectionType = true;
    }

    if (model.mode === 'single') {
      isMatchedSelectionType = this.selectedRecords.length === 1;
    } else if (model.mode === 'multi') {
      isMatchedSelectionType = this.selectedRecords.length >= 1;
    }

    if (isMatchedSelectionType) {
      result = model.visible ? model.visible({}) : isMatchedSelectionType;
    } else {
      result = false;
    }

    return result;
  }

  private getTableColumns(): { [columnName: string]: any } {
    if (!this.columns) {
      return {};
    }

    const tableColumns: { [name: string]: any } = {};
    Object.keys(this.columns).forEach(
      (columnName: string) => {
        const column: OwerpColumnDefinition = this.columns[columnName];
        const colDef: any = {};
        colDef['title'] = column.title;
        if (column.type === OwerpTableColumnType.TEXT || column.type === OwerpTableColumnType.NUMBER) {
          colDef['type'] = 'string';
        } else if (column.type === OwerpTableColumnType.BOOLEAN) {
          colDef['type'] = 'custom';
          colDef['renderComponent'] = OwerpBooleanColumnComponent;
          colDef['filter'] = {
            type: 'checkbox',
            config: {
              class: '',
              true: 'true',
              false: 'false',
              resetText: 'clear'
            }
          };
        }

        tableColumns[columnName] = colDef;
      }
    );
    return tableColumns;

  }

}
