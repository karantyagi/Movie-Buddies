import { Component, OnInit } from '@angular/core';
import {MovieListingService} from '../../services/movie-listing.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../../models/movie.model.client';
import {MovieDetail} from '../../models/movieDetail.model.client';
import {User} from '../../models/user.model.client';
import {UserService} from '../../services/user.service';

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

  user: User = new User();

  constructor(private movieService: MovieListingService,  private route: ActivatedRoute,
              private userService: UserService, private router: Router) {
    this.requested = false;
    // sleep time expects milliseconds
    const sleep = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    };

    this.route.params.subscribe(param => {
      // console.log('PARAMS: ', param);
      this.page = param.page;
      this.page = param.page;
      this.movieId = param.movieId;
      console.log("Movie ID: ", this.movieId);
      this.fetchMoviesDetail(this.movieId);
      // Usage millisecs!
      sleep(500).then(() => {
        // Do something after the sleep!
        /**
         * restricted API call
         *
         this.fetchMoviesDetail(this.movieId);
         */
      });
    });
  }


  sessionCheck() {
    this.userService.findLoggedUser().then((user) => {
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
    console.log('>>>>', this.user.username);
    if(this.user.username == 'No session maintained' || this.user.username === undefined){
      alert('Login to request a movie!');
    }
    else{
      console.log('Movie added to user\'s Requested list! [Movie Status]: ', this.requested);
      this.requested = true;
    }
  }


  ngOnInit() {
  }

}
