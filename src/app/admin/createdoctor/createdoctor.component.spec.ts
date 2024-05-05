import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedoctorComponent } from './createdoctor.component';

describe('CreatedoctorComponent', () => {
  let component: CreatedoctorComponent;
  let fixture: ComponentFixture<CreatedoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatedoctorComponent]
    });
    fixture = TestBed.createComponent(CreatedoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
