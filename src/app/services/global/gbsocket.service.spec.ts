import { TestBed } from '@angular/core/testing';

import { GbsocketService } from './gbsocket.service';

describe('GbsocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GbsocketService = TestBed.get(GbsocketService);
    expect(service).toBeTruthy();
  });
});
