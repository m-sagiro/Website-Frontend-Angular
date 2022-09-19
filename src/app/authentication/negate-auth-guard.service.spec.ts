import { TestBed } from '@angular/core/testing';

import { NegateAuthGuardService } from './negate-auth-guard.service';

describe('NegateAuthGuardService', () => {
  let service: NegateAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegateAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
