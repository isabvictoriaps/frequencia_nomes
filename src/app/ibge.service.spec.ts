import { TestBed } from '@angular/core/testing';

import { IBGEService } from './ibge.service';

describe('IBGEService', () => {
  let service: IBGEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IBGEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
