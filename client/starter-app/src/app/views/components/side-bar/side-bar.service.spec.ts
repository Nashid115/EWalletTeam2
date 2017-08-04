import { TestBed, inject } from '@angular/core/testing';

import { SideBarService } from './side-bar.service';

describe('SideBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SideBarService]
    });
  });

  it('should ...', inject([SideBarService], (service: SideBarService) => {
    expect(service).toBeTruthy();
  }));
});
