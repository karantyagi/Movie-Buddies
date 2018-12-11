import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBuddiesHomeComponent } from './movie-buddies-home.component';

describe('MovieBuddiesHomeComponent', () => {
  let component: MovieBuddiesHomeComponent;
  let fixture: ComponentFixture<MovieBuddiesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieBuddiesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieBuddiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
