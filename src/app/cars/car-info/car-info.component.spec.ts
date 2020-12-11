import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarInfoComponent } from './car-info.component';

describe('CarInfoComponent', () => {
  let component: CarInfoComponent;
  let fixture: ComponentFixture<CarInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
