import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinePrescriptionComponent } from './spine-prescription.component';

describe('SpinePrescriptionComponent', () => {
  let component: SpinePrescriptionComponent;
  let fixture: ComponentFixture<SpinePrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinePrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
