import { TestBed } from '@angular/core/testing';

import { MangaSerService } from './manga-ser.service';

describe('MangaSerService', () => {
  let service: MangaSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangaSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
