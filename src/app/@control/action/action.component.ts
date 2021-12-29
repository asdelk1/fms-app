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

  public isVisible: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.setVisible();
  }

  public onClick(): void {
    this.settings.execute(this.data);
  }

  public getStatus(): string {
    return this.settings.status ? this.settings.status : 'basic';
  }

  public setVisible(): void {
    if (this.settings.visible === undefined) {
      this.isVisible = true;
    } else {
      this.isVisible = this.settings.visible(this.data);
    }
  }

}
