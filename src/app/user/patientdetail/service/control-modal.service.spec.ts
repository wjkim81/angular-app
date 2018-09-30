import { TestBed } from '@angular/core/testing';

import { ControlModalService } from './control-modal.service';

describe('ControlModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlModalService = TestBed.get(ControlModalService);
    expect(service).toBeTruthy();
  });
});
