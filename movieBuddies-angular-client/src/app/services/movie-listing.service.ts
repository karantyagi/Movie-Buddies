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
  MOVIE_SEARCH = '';
  TOP_RATED_MOVIES = '';
  UPCOMING_MOVIES = '';
  POPULAR_MOVIES = '';

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
    });
  }

  findPopularMovies(pageNumber) {
    this.POPULAR_MOVIES = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKey + '&language=en-US&page=' + pageNumber;
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": this.POPULAR_MOVIES,
      "method": "GET",
      "headers": {},
      "data": "{}"
    };
    return $.ajax(settings).done(function (response) {
    });
  }


  findUpcomingMovies(pageNumber) {
    this.UPCOMING_MOVIES = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + this.apiKey + '&language=en-US&page=' + pageNumber;
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": this.UPCOMING_MOVIES,
      "method": "GET",
      "headers": {},
      "data": "{}"
    };
    return $.ajax(settings).done(function (response) {
      // console.log(response);
    });
  }

  findTopRatedMovies(pageNumber) {
    this.TOP_RATED_MOVIES = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + this.apiKey + '&language=en-US&page=' + pageNumber;
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": this.TOP_RATED_MOVIES,
      "method": "GET",
      "headers": {},
      "data": "{}"
    };
    return $.ajax(settings).done(function (response) {
    });
  }

  findMoviesWithKeyword(keyword, page) {
    this.MOVIE_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=82b134725a5ddd6d59db3f4126ef8890&language=en-US&query='
      + keyword + '&page=' + page + '&include_adult=false';
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": this.MOVIE_SEARCH,
      "method": "GET",
      "headers": {},
      "data": "{}"
    };
    return $.ajax(settings).done(function (response) {
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
