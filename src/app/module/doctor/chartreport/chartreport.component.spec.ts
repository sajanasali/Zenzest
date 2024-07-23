import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartreportComponent } from './chartreport.component';

describe('ChartreportComponent', () => {
  let component: ChartreportComponent;
  let fixture: ComponentFixture<ChartreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartreportComponent]
    });
    fixture = TestBed.createComponent(ChartreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
