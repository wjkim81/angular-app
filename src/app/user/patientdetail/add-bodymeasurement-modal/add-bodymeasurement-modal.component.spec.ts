import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBodymeasurementModalComponent } from './add-bodymeasurement-modal.component';

describe('AddBodymeasurementModalComponent', () => {
  let component: AddBodymeasurementModalComponent;
  let fixture: ComponentFixture<AddBodymeasurementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBodymeasurementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBodymeasurementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
