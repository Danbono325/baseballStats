import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionChartsComponent } from './session-charts.component';

describe('SessionChartsComponent', () => {
  let component: SessionChartsComponent;
  let fixture: ComponentFixture<SessionChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
