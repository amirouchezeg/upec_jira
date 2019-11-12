import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSprintComponent } from './one-sprint.component';

describe('OneSprintComponent', () => {
  let component: OneSprintComponent;
  let fixture: ComponentFixture<OneSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
