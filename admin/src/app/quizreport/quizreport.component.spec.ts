import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizreportComponent } from './quizreport.component';

describe('QuizreportComponent', () => {
  let component: QuizreportComponent;
  let fixture: ComponentFixture<QuizreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
