import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarsFiltersComponent } from './cars-filters.component';

describe('CarsFiltersComponent', () => {
  let component: CarsFiltersComponent;
  let fixture: ComponentFixture<CarsFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
