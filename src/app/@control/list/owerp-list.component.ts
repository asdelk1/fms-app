import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-owerp-list',
  templateUrl: './owerp-list.component.html',
  styleUrls: ['./owerp-list.component.css']
})
export class OwerpListComponent implements OnInit {

  @Input()
  public items: any[];

  @Input()
  public title: string = '';

  @Input()
  displayAttr: string;

  @Output()
  public selectItem: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public getDisplayValue(data: any): string {
    if (!this.displayAttr) {
      return '';
    }
    return data[this.displayAttr];
  }

}
