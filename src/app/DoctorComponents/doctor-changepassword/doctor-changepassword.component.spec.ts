import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorChangepasswordComponent } from './doctor-changepassword.component';

describe('DoctorChangepasswordComponent', () => {
  let component: DoctorChangepasswordComponent;
  let fixture: ComponentFixture<DoctorChangepasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorChangepasswordComponent]
    });
    fixture = TestBed.createComponent(DoctorChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
