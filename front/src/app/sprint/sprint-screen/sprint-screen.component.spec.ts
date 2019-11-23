import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintScreenComponent } from './sprint-screen.component';

describe('SprintScreenComponent', () => {
  let component: SprintScreenComponent;
  let fixture: ComponentFixture<SprintScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
