import { TestBed } from '@angular/core/testing';

import { ValidatorsPatternsService } from './validators-patterns.service';

describe('ValidatorsPatternsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidatorsPatternsService = TestBed.get(ValidatorsPatternsService);
    expect(service).toBeTruthy();
  });
});
