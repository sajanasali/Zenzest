import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentpageComponent } from './appointmentpage.component';

describe('AppointmentpageComponent', () => {
  let component: AppointmentpageComponent;
  let fixture: ComponentFixture<AppointmentpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentpageComponent]
    });
    fixture = TestBed.createComponent(AppointmentpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
