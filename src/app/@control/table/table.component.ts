import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {
  OwerpColumnDefinition,
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpTableSelectionMode
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
  public selectionMode: OwerpTableSelectionMode = OwerpTableSelectionMode.SINGLE;

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
      selectMode: this.selectionMode === OwerpTableSelectionMode.MULTI ? 'multi' : 'single',
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
    if (this.selectedRecords.length === 0) {
      return false;
    } else if (model.mode === 'single') {
      return this.selectedRecords.length === 1;
    } else if (model.visible !== undefined) {
      return model.visible(this.selectedRecords);
    }
    return true;
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
