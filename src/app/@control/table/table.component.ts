import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {OwerpTableColumn, OwerpTableSelectionMode} from './owerp-table.model';
import {OwerpActionModel} from '../action/owerp-action.model';

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
  public columns: OwerpTableColumn = {};

  @Input()
  public actions: OwerpActionModel[];

  @Input()
  public selectionMode: OwerpTableSelectionMode = OwerpTableSelectionMode.SINGLE;

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
        enable: false,
        edit: false,
        delete: false
      }
    };
    tableSettings['columns'] = this.columns ? this.columns : {};
    this.settings = tableSettings;
  }

  public onCreate(): void {
    this.create.emit();
  }

  public onUserRowSelect(rows: any[]): void {
    this.selectedRecords = rows;
  }

  public getActionSettings(model: OwerpActionModel): OwerpActionModel {
    model.execute.bind(this.selectedRecords);
    return model;
  }

  public isVisible(model: OwerpActionModel): boolean {
    if (this.selectedRecords.length === 0) {
      return false;
    } else if (model.mode === 'single') {
      return this.selectedRecords.length === 1;
    }
    return true;
  }


}
