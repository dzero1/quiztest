import { TestBed, inject } from '@angular/core/testing';

import { PouchDbserviceService } from './pouch-dbservice.service';

describe('PouchDbserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PouchDbserviceService]
    });
  });

  it('should be created', inject([PouchDbserviceService], (service: PouchDbserviceService) => {
    expect(service).toBeTruthy();
  }));
});
