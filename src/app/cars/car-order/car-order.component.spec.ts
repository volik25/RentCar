import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarOrderComponent } from './car-order.component';

describe('CarOrderComponent', () => {
  let component: CarOrderComponent;
  let fixture: ComponentFixture<CarOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
