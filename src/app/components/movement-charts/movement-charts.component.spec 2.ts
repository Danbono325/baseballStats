import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementChartsComponent } from './movement-charts.component';

describe('MovementChartsComponent', () => {
  let component: MovementChartsComponent;
  let fixture: ComponentFixture<MovementChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
