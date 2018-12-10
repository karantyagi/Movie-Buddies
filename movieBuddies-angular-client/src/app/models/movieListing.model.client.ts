import {Movie} from './movie.model.client';

export class MovieListing {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

