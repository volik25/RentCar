import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminCarsComponent } from './admin-cars.component';

describe('AdminCarsComponent', () => {
  let component: AdminCarsComponent;
  let fixture: ComponentFixture<AdminCarsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
