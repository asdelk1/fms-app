import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserGroupComponent } from './list-user-group.component';

describe('ListUserGroupComponent', () => {
  let component: ListUserGroupComponent;
  let fixture: ComponentFixture<ListUserGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
