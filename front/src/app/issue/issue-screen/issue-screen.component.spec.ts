import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueScreenComponent } from './issue-screen.component';

describe('IssueScreenComponent', () => {
  let component: IssueScreenComponent;
  let fixture: ComponentFixture<IssueScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
