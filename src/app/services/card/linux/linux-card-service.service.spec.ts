import { TestBed } from '@angular/core/testing';

import { LinuxCardServiceService } from './linux-card-service.service';

describe('LinuxCardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinuxCardServiceService = TestBed.get(LinuxCardServiceService);
    expect(service).toBeTruthy();
  });
});
