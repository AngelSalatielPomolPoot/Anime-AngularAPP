import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajeDetailsComponent } from './personaje-details.component';

describe('PersonajeDetailsComponent', () => {
  let component: PersonajeDetailsComponent;
  let fixture: ComponentFixture<PersonajeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonajeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonajeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
