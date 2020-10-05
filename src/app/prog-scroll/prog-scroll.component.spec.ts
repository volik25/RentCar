import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgScrollComponent } from './prog-scroll.component';

describe('ProgScrollComponent', () => {
  let component: ProgScrollComponent;
  let fixture: ComponentFixture<ProgScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
