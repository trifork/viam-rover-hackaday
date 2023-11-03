import { TestBed } from '@angular/core/testing';

import { ViamService } from './viam-service.service';

describe('ViamServiceService', () => {
  let service: ViamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
