import { TestBed } from '@angular/core/testing';

import { appPagesService } from './app-pages.service';

describe('appPagesService', () => {
  let service: appPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(appPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
