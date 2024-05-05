import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresciptionComponent } from './presciption.component';

describe('PresciptionComponent', () => {
  let component: PresciptionComponent;
  let fixture: ComponentFixture<PresciptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresciptionComponent]
    });
    fixture = TestBed.createComponent(PresciptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
