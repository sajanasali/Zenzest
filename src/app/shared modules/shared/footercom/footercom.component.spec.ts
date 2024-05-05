import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercomComponent } from './footercom.component';

describe('FootercomComponent', () => {
  let component: FootercomComponent;
  let fixture: ComponentFixture<FootercomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FootercomComponent]
    });
    fixture = TestBed.createComponent(FootercomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
