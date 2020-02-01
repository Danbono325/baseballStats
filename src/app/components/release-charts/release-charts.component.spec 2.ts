import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseChartsComponent } from './release-charts.component';

describe('ReleaseChartsComponent', () => {
  let component: ReleaseChartsComponent;
  let fixture: ComponentFixture<ReleaseChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
