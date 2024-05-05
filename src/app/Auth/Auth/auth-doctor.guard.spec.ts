import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authDoctorGuard } from './auth-doctor.guard';

describe('authDoctorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authDoctorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
