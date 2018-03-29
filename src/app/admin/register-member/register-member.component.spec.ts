import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMemberComponent } from './register-member.component';

describe('RegisterHospitalComponent', () => {
  let component: RegisterMemberComponent;
  let fixture: ComponentFixture<RegisterMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
