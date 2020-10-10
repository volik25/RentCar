import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCommentsComponent } from './car-comments.component';

describe('CarCommentsComponent', () => {
  let component: CarCommentsComponent;
  let fixture: ComponentFixture<CarCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
