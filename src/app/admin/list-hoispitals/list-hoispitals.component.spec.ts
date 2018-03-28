import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHoispitalsComponent } from './list-hoispitals.component';

describe('ListHoispitalsComponent', () => {
  let component: ListHoispitalsComponent;
  let fixture: ComponentFixture<ListHoispitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHoispitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHoispitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
