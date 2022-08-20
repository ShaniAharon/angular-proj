import { TestBed } from '@angular/core/testing';

import { Bitcoin.ServiceService } from './bitcoin.service.service';

describe('Bitcoin.ServiceService', () => {
  let service: Bitcoin.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bitcoin.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
