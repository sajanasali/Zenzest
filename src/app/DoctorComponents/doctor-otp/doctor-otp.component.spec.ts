import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorOtpComponent } from './doctor-otp.component';

describe('DoctorOtpComponent', () => {
  let component: DoctorOtpComponent;
  let fixture: ComponentFixture<DoctorOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorOtpComponent]
    });
    fixture = TestBed.createComponent(DoctorOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
