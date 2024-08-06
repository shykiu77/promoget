import { TestBed } from '@angular/core/testing';

import { MenuTogglerService } from './menu-toggler.service';

describe('MenuTogglerService', () => {
  let service: MenuTogglerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuTogglerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
