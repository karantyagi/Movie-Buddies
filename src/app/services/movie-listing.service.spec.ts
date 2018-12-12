import { TestBed } from '@angular/core/testing';

import { MovieListingService } from './movie-listing.service';

describe('MovieListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieListingService = TestBed.get(MovieListingService);
    expect(service).toBeTruthy();
  });
});
