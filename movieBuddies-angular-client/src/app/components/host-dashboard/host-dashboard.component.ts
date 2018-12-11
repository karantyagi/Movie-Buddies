import { Component, OnInit } from '@angular/core';
import {MovieEvent} from '../../models/movieEvent.model.client';
import {MovieListingService} from '../../services/movie-listing.service';
import {ActivatedRoute} from '@angular/router';

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
  movies = '';
  event: MovieEvent = new MovieEvent();
  eventId = '1';

  constructor(private route: ActivatedRoute) {
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

  updateEvent(eventName, maxTickets, date, location, movies, time) {
    this.updateMode = false;
  }


  createEvent(eventName, maxTickets, date, location, movies, time) {
    this.addMode = false;
  }

  getEventDetail(eventId){
    console.log(" getEventDetails() = Get event by ID");
    this.eventName = 'Movie night';
    this.date = '2018-Dec-15'
    this.location = '#30B Saint Alphonsus Street';
    this.time = '7:00 p.m.';
    this.movies = 'Venom, A star is Born';
    this.maxTickets = '15';
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



  ngOnInit() {
}
}
