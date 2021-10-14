import {Component, Input, OnInit} from '@angular/core';
import {OwerpActionModel} from './owerp-action.model';

@Component({
  selector: 'ngx-owerp-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  @Input()
  public settings: OwerpActionModel;
  @Input()
  public data: any | any[];

  constructor() {
  }

  ngOnInit(): void {
  }

  public onClick(): void {
    this.settings.execute(this.data);
  }

  public getStatus(): string {
    return this.settings.status ? this.settings.status : 'basic';
  }

}
