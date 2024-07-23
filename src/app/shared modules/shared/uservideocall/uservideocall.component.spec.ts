import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UservideocallComponent } from './uservideocall.component';

describe('UservideocallComponent', () => {
  let component: UservideocallComponent;
  let fixture: ComponentFixture<UservideocallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UservideocallComponent]
    });
    fixture = TestBed.createComponent(UservideocallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
