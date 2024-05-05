import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorForgotPasswordComponent } from './doctor-forgot-password.component';

describe('DoctorForgotPasswordComponent', () => {
  let component: DoctorForgotPasswordComponent;
  let fixture: ComponentFixture<DoctorForgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(DoctorForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
