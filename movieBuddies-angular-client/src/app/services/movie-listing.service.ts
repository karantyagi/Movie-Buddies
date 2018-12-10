import {Injectable} from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MovieListingService {

  page = '1';
  apiKey = '82b134725a5ddd6d59db3f4126ef8890';
  ONGOING_MOVIES_URL = '';
  MOVIE_DETAILS = '';

  constructor() {
  }

  findOnGoingMovies(pageNumber) {
    this.ONGOING_MOVIES_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + this.apiKey + '&language=en-US&page=' + pageNumber;
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": this.ONGOING_MOVIES_URL,
      "method": "GET",
      "headers": {},
      "data": "{}"
    };
    return $.ajax(settings).done(function (response) {
     // console.log(response);
    });
  }

  findMoviesDetails(movieId) {
    this.MOVIE_DETAILS = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + this.apiKey + '&language=en-US';
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": this.MOVIE_DETAILS,
      "method": "GET",
      "headers": {},
      "data": "{}"
    };
    return $.ajax(settings).done(function (response) {
      console.log(response);
    });

  }

}
