import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSheduleComponent } from './doctor-shedule.component';

describe('DoctorSheduleComponent', () => {
  let component: DoctorSheduleComponent;
  let fixture: ComponentFixture<DoctorSheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorSheduleComponent]
    });
    fixture = TestBed.createComponent(DoctorSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
