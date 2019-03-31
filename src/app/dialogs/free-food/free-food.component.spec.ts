import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeFoodComponent } from './free-food.component';

describe('FreeFoodComponent', () => {
  let component: FreeFoodComponent;
  let fixture: ComponentFixture<FreeFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
