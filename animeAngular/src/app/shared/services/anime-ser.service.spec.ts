import { TestBed } from '@angular/core/testing';

import { AnimeSerService } from './anime-ser.service';

describe('AnimeSerService', () => {
  let service: AnimeSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
