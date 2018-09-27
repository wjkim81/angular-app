import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobbAngleComponent } from './cobb-angle.component';

describe('CobbAngleComponent', () => {
  let component: CobbAngleComponent;
  let fixture: ComponentFixture<CobbAngleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobbAngleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobbAngleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
