import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeListaComponent } from './anime-lista.component';

describe('AnimeListaComponent', () => {
  let component: AnimeListaComponent;
  let fixture: ComponentFixture<AnimeListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
