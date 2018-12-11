import { Component, OnInit } from '@angular/core';
import {MovieListingService} from '../../services/movie-listing.service';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../models/movie.model.client';
import {MovieDetail} from '../../models/movieDetail.model.client';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model.client';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  url = 'https://www.themoviedb.org/assets/1/v4/logos/312x276-primary-green-74212f6247252a023be0f02a5a45794925c3689117da9d20ffe47742a665c518.png';
  page = '';
  movieId = '';
  movieDetails: MovieDetail;
  movie: Movie;
  requested = false;
  user :User;

  constructor(private movieService: MovieListingService,
              private mService: MovieService, private route: ActivatedRoute, private userService: UserService) {
    this.requested = false;
    // sleep time expects milliseconds
    const sleep = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    };

    this.sessionCheck();

    this.route.params.subscribe(param => {
      // console.log('PARAMS: ', param);
      this.page = param.page;
      this.page = param.page;
      this.movieId = param.movieId;
      console.log("Movie ID: ", this.movieId);
      this.fetchMoviesDetail(this.movieId);
      // Usage millisecs!
      sleep(100).then(() => {
        // Do something after the sleep!
        /**
         * restricted API call
         *
         this.fetchMoviesDetail(this.movieId);
         */
      });
    });
  }

  fetchMoviesDetail(mId) {
    this.movie = new Movie();
    this.movieService.findMoviesDetails(mId)
      .then((response) => {
        this.movieDetails = response;
        console.log('details : ', response);
        this.movie.poster_url = this.movieDetails.poster_path;
        this.url = 'http://image.tmdb.org/t/p/w342/' + this.movie.poster_url;
        this.movie.title = this.movieDetails.title;
        this.movie.rating = this.movieDetails.vote_average.toString();
        this.movie.overview = this.movieDetails.overview;
        this.movie.release_date = this.movieDetails.release_date;
        this.movie.id = this.movieDetails.id.toString();
        this.movie.homepage_url = this.movieDetails.homepage;
        this.movie.status = this.movieDetails.status;

      }).catch(console.log);
  }

  requestMovie(){
    console.log('Movie added to user\'s Requested list! [Movie Status]: ', this.requested);

    this.movie.user = this.user['_id'];
    console.log('Requested movie create', this.movie);
    this.mService.createMovie(this.movie)
      .then( result =>
      {
        if(result!=null) {
          this.requested = true;
        }
      });
  }



  sessionCheck() {
    this.userService.findLoggedUser().then((user) => {
      if(user['username'] == 'No session maintained'){
        console.log("User not in session")
        this.user = null;
      }
      else{
        console.log('User in session : ', user['username']);
        console.log('ROLE : ', user['role']);
        this.user = user;
      }
    });
  }




  ngOnInit() {
  }

}
