import { Component, OnInit } from '@angular/core';
import {Movie} from '../../models/movie.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieListingService} from '../../services/movie-listing.service';
import {MovieListing} from '../../models/movieListing.model.client';
import {User} from '../../models/user.model.client';
import {UserService} from '../../services/user.service';


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
  user: User = new User();

  constructor(private movieService: MovieListingService,
              private userService: UserService, private route: ActivatedRoute,
              private router: Router) {
    this.sessionCheck();
    // sleep time expects milliseconds
    const sleep = (time) =>  {
      return new Promise((resolve) => setTimeout(resolve, time));
    };

    this.route.params.subscribe(param => {
      // console.log('PARAM PAGE: ', param.page);
      this.page = param.page;
      console.log('Page: ', this.page);
      if ( parseInt(this.page) < 1) { this.page = '1'; }
      if ( parseInt(this.page) > 25) { this.page = '10'; }

      // Usage millisecs!
      sleep(500).then(() => {
        // Do something after the sleep!
        this.fetchAllOngoingMovies(this.page);
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

  fetchAllOngoingMovies(page) {
    this.latestMovies = [];


    this.movieService.findOnGoingMovies(page)
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

  fetchPopularMovies(page) {
    this.latestMovies = [];

    this.movieService.findPopularMovies(page)
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

  fetchTopRatedMovies(page) {
    this.latestMovies = [];

    this.movieService.findTopRatedMovies(page)
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

  fetchUpcomingMovies(page) {
    this.latestMovies = [];

    this.movieService.findUpcomingMovies(page)
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

  sessionCheck() {
    this.user.username = "No session maintained";
    this.userService.findLoggedUser().then((user) => {
      console.log('USER', user);
      if(user['username'] == 'No session maintained'){
        console.log("User not in session")
      }
      else{
        console.log('User in session : ', user['username']);
        console.log('ROLE : ', user['role']);
        this.user = user;
      }
    });
  }

  logout() {
    this.user.username = 'No session maintained';
    this.userService.logout().then(() => this.router.navigate(['/home']))
      .then(() =>
        this.userService.findLoggedUser().then((user) => {
            if(user['username'] == 'No session maintained'){
              console.log("User not in session")
            }
            else{
              console.log('User in session : ', user['username']);
              console.log('ROLE : ', user['role']);
            }
          }
        ));
  }



  ngOnInit() {
  }

}
