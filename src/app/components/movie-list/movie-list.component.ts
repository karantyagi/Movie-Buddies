import { Component, OnInit } from '@angular/core';
import {Movie} from '../../models/movie.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieListingService} from '../../services/movie-listing.service';
import {MovieListing} from '../../models/movieListing.model.client';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  keyword = '';
  page = '';
  latestMovieResults: MovieListing;
  latestMovies: Movie [] = [];

  constructor(private movieService: MovieListingService,  private route: ActivatedRoute,private router: Router) {
    // sleep time expects milliseconds
    const sleep = (time) =>  {
      return new Promise((resolve) => setTimeout(resolve, time));
    };

    this.route.params.subscribe(param => {
      // console.log('PARAM PAGE: ', param.page);
      this.page = param.page;
      console.log('Page: ', this.page);
      let p = +this.page
      if (p < 1) { this.page = '1'; }
      if (p > 25) { this.page = '10'; }

      // Usage millisecs!
      sleep(500).then(() => {
        // Do something after the sleep!
        this.fetchAllOngoingMovies();
        /**
         * restricted API call
         *
         this.fetchAllOngoingMovies(this.page);
         */
      });
    });
  }

  fetchMoviesByKeyword(){
    this.latestMovies = [];
    console.log(this.keyword);
    this.movieService.findMoviesWithKeyword(this.keyword, this.page)
      .then((response) => {
          this.latestMovieResults = response;
          console.log('Type : ', typeof this.latestMovieResults);
          console.log(this.latestMovieResults.results);
          this.latestMovieResults.results.forEach((movie) => {
            const m = new Movie();
            m.id = movie.id;
            m.title = movie.title;
            m.release_date = movie.release_date;
            this.latestMovies = this.latestMovies.concat(m);
          });
          console.log("Keyword movies", this.latestMovies);
        }
      ).catch(console.log);

  }

  fetchAllOngoingMovies() {
    this.latestMovies = [];

    this.movieService.findOnGoingMovies(this.page)
      .then((response) => {
          this.latestMovieResults = response;
          console.log('Type : ', typeof this.latestMovieResults);
          console.log(this.latestMovieResults.results);
          this.latestMovieResults.results.forEach((movie) => {
            const m = new Movie();
            m.id = movie.id;
            m.title = movie.title;
            m.release_date = movie.release_date;
            this.latestMovies = this.latestMovies.concat(m);
          });
          console.log(this.latestMovies);
        }
      ).catch(console.log);
  }

  fetchPopularMovies() {
    this.latestMovies = [];

    this.movieService.findPopularMovies(this.page)
      .then((response) => {
          this.latestMovieResults = response;
          console.log('Type : ', typeof this.latestMovieResults);
          console.log(this.latestMovieResults.results);
          this.latestMovieResults.results.forEach((movie) => {
            const m = new Movie();
            m.id = movie.id;
            m.title = movie.title;
            m.release_date = movie.release_date;
            this.latestMovies = this.latestMovies.concat(m);
          });
          console.log(this.latestMovies);
        }
      ).catch(console.log);
  }

  fetchTopRatedMovies() {
    this.latestMovies = [];

    this.movieService.findTopRatedMovies(this.page)
      .then((response) => {
          this.latestMovieResults = response;
          console.log('Type : ', typeof this.latestMovieResults);
          console.log(this.latestMovieResults.results);
          this.latestMovieResults.results.forEach((movie) => {
            const m = new Movie();
            m.id = movie.id;
            m.title = movie.title;
            m.release_date = movie.release_date;
            this.latestMovies = this.latestMovies.concat(m);
          });
          console.log(this.latestMovies);
        }
      ).catch(console.log);
  }

  fetchUpcomingMovies() {
    this.latestMovies = [];

    this.movieService.findUpcomingMovies(this.page)
      .then((response) => {
          this.latestMovieResults = response;
          console.log('Type : ', typeof this.latestMovieResults);
          console.log(this.latestMovieResults.results);
          this.latestMovieResults.results.forEach((movie) => {
            const m = new Movie();
            m.id = movie.id;
            m.title = movie.title;
            m.release_date = movie.release_date;
            this.latestMovies = this.latestMovies.concat(m);
          });
          console.log(this.latestMovies);
        }
      ).catch(console.log);
  }

  ngOnInit() {
  }

  nextPage() {
    var pageNum= +this.page
    pageNum =pageNum+1;
    let url = "/movie-list/" + pageNum ;
    this.router.navigate([url]).then(()=> console.log("moved to next page"));
  }

  previousPage() {
    var pageNum= +this.page
    if(pageNum >= 2){
    pageNum = pageNum - 1;}
    let url = "/movie-list/" + pageNum ;
    this.router.navigate([url]).then(()=> console.log("moved to next page"));
  }
}
