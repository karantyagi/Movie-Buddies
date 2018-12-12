import { Component, OnInit } from '@angular/core';
import {MovieEvent} from '../../models/movieEvent.model.client';
import {MovieListingService} from '../../services/movie-listing.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model.client';
import {UserService} from '../../services/user.service';
import {EventService} from '../../services/event.service';
import {MovieDetail} from '../../models/movieDetail.model.client';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent implements OnInit {

  addMode = false;
  updateMode = false;
  hostId = '';
  eventName = '';
  maxTickets = '';
  date  = '';
  location = '';
  time = '';
  eventMoviesList = '';
  movies = '';
  event: MovieEvent = new MovieEvent();
  eventId = '1';
  myevents: MovieEvent[] = [];
  requestedMovies:MovieDetail[] = [];

  user: User = new User();

  constructor(private userService: UserService,
              private eventService: EventService,
              private movieService: MovieService,
              private router: Router, private route: ActivatedRoute) {
    this.sessionCheck();
    this.route.params.subscribe(param => {
       console.log('PARAMS: ', param);
       if(param.eventId === undefined){
         this.updateMode = false;
       }
       else{
         this.updateMode = true;
         this.eventId = param.eventId;
         console.log('EVENT ID : ', this.eventId);
         this.getEventDetail(this.eventId);
       }
    });

  }

  cancel() {
    this.addMode = false;
  }

  cancelUpdateMode() {
    this.updateMode = false;
  }

  updateEvent() {
    this.updateMode = false;
    // console.log('UPDATE....', this.event);
    this.eventService.updateEvent(this.event['_id'], this.event)
      .then( (result) => {
        // alert('Event Updated!');
        this.router.navigate(['/dashboard-host']);
      });
  }


  createEvent() {
    this.addMode = false;
    this.event.user = this.user['_id'];
    console.log('ADDING...', this.event);
    this.eventService.createEvent(this.event)
      .then( (result) => {
        this.sessionCheck();
        // this.router.navigate(['/dashboard-host']);
      });
  }

  deleteEvent(id){
    this.eventService.deleteEvent(id)
      .then( (result) => {
        this.sessionCheck();
      });
  }

  getEventDetail(eventId){
    console.log(" getEventDetails() = Get event by ID");
    this.eventService.findEventById(eventId)
      .then( (result) =>
      {
        this.event = result[0];
      })

  }

  sessionCheck() {
    this.requestedMovies = [];
    this.event.movies = '';
    this.myevents = [];
    this.userService.findLoggedUser().then((user) => {
      if(user['username'] == 'No session maintained'){
        console.log("User not in session")
      }
      else{
        console.log('User in session : ', user['username']);
        console.log('ROLE : ', user['role']);
        this.user = user;
        this.eventService.findEventByUserId(this.user['_id'])
          .then ( (results) => {
            console.log('My EVENTS : ', results);
            this.myevents = results;
            this.movieService.findAllMovies()
              .then( (result) => {
                console.log('all REQUESTED MOVIES : ', result);
                this.requestedMovies = result;
              })
          });
      }
    });
  }

  addMovie(m){
    this.event.movies = this.event.movies + m.title + ', ';
  }

  removeMovie(m){
    this.event.movies = this.event.movies.replace(m.title+', ', '');
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
