import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeFoodStudentComponent } from './free-food-student.component';

describe('FreeFoodStudentComponent', () => {
  let component: FreeFoodStudentComponent;
  let fixture: ComponentFixture<FreeFoodStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeFoodStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeFoodStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
