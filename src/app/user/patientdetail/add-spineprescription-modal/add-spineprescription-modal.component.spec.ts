import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpineprescriptionModalComponent } from './add-spineprescription-modal.component';

describe('AddSpineprescriptionModalComponent', () => {
  let component: AddSpineprescriptionModalComponent;
  let fixture: ComponentFixture<AddSpineprescriptionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpineprescriptionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpineprescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
