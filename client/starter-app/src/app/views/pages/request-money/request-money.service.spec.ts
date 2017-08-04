import { TestBed, inject } from '@angular/core/testing';

import { RequestMoneyService } from './request-money.service';

describe('RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestMoneyService]
    });
  });

  it('should ...', inject([RequestMoneyService], (service: RequestMoneyService) => {
    expect(service).toBeTruthy();
  }));
});
