import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsTodayComponent } from './patients-today.component';

describe('PatientsTodayComponent', () => {
  let component: PatientsTodayComponent;
  let fixture: ComponentFixture<PatientsTodayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsTodayComponent]
    });
    fixture = TestBed.createComponent(PatientsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
