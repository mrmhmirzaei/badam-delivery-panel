import { TestBed } from '@angular/core/testing';

import { WindowCardServiceService } from './window-card-service.service';

describe('WindowCardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowCardServiceService = TestBed.get(WindowCardServiceService);
    expect(service).toBeTruthy();
  });
});
