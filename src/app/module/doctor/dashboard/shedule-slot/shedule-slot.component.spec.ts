import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheduleSlotComponent } from './shedule-slot.component';

describe('SheduleSlotComponent', () => {
  let component: SheduleSlotComponent;
  let fixture: ComponentFixture<SheduleSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SheduleSlotComponent]
    });
    fixture = TestBed.createComponent(SheduleSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
