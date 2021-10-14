import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwerpListComponent } from './owerp-list.component';

describe('ListComponent', () => {
  let component: OwerpListComponent;
  let fixture: ComponentFixture<OwerpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwerpListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwerpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
