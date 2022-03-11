import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HearderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HearderComponent;
  let fixture: ComponentFixture<HearderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HearderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HearderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
