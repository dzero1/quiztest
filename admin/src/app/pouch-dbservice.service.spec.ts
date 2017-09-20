import { TestBed, inject } from '@angular/core/testing';

import { PouchDBServiceService } from './pouch-dbservice.service';

describe('PouchDBServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PouchDBServiceService]
    });
  });

  it('should be created', inject([PouchDBServiceService], (service: PouchDBServiceService) => {
    expect(service).toBeTruthy();
  }));
});
