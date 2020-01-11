import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsOverviewComponent } from './sessions-overview.component';

describe('SessionsOverviewComponent', () => {
  let component: SessionsOverviewComponent;
  let fixture: ComponentFixture<SessionsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
