import { TestBed } from '@angular/core/testing';

import { PersonajesSerService } from './personajes-ser.service';

describe('PersonajesSerService', () => {
  let service: PersonajesSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonajesSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
