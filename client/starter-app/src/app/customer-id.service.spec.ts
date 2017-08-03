import { TestBed, inject } from '@angular/core/testing';

import { CustomerIdService } from './customer-id.service';

describe('CustomerIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerIdService]
    });
  });

  it('should ...', inject([CustomerIdService], (service: CustomerIdService) => {
    expect(service).toBeTruthy();
  }));
});
