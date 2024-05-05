import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessPageComponent } from './sucess-page.component';

describe('SucessPageComponent', () => {
  let component: SucessPageComponent;
  let fixture: ComponentFixture<SucessPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucessPageComponent]
    });
    fixture = TestBed.createComponent(SucessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
