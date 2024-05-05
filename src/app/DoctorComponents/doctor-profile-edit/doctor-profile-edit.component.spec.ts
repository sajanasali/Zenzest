import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProfileEditComponent } from './doctor-profile-edit.component';

describe('DoctorProfileEditComponent', () => {
  let component: DoctorProfileEditComponent;
  let fixture: ComponentFixture<DoctorProfileEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorProfileEditComponent]
    });
    fixture = TestBed.createComponent(DoctorProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
