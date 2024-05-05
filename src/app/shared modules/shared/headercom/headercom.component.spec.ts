import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadercomComponent } from './headercom.component';

describe('HeadercomComponent', () => {
  let component: HeadercomComponent;
  let fixture: ComponentFixture<HeadercomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadercomComponent]
    });
    fixture = TestBed.createComponent(HeadercomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
