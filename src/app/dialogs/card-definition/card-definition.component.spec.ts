import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDefinitionComponent } from './card-definition.component';

describe('CardDefinitionComponent', () => {
  let component: CardDefinitionComponent;
  let fixture: ComponentFixture<CardDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
