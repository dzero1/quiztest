import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddquizDialogComponent} from './addquiz-dialog.component';

describe('AddquizDialogComponent', () => {
  let component: AddquizDialogComponent;
  let fixture: ComponentFixture<AddquizDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddquizDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddquizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
