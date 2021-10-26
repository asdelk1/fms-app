import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'ngx-owerp-boolean-column',
  templateUrl: './owerp-boolean-column.component.html',
  styleUrls: ['./owerp-boolean-column.component.css']
})
export class OwerpBooleanColumnComponent implements ViewCell, OnInit {

  public isTrue: boolean;

  @Input()
  rowData: any;
  @Input()
  value: string | number;

  constructor() {
  }

  ngOnInit(): void {
    let result: boolean = false;
    if ((typeof this.value === 'number' && this.value === 1) ||
      (typeof this.value === 'string' && (this.value === 'true' || this.value === '1'))) {
      result = true;
    } else if (typeof this.value === 'boolean') {
      result = this.value;
    }
    this.isTrue = result;
  }

}
