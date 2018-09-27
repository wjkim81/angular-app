import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMeasurementComponent } from './body-measurement.component';

describe('BodyMeasurementComponent', () => {
  let component: BodyMeasurementComponent;
  let fixture: ComponentFixture<BodyMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
