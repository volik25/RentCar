import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilesManagerComponent } from './files-manager.component';

describe('FilesManagerComponent', () => {
  let component: FilesManagerComponent;
  let fixture: ComponentFixture<FilesManagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
