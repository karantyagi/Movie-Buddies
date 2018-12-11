import { Component, OnInit } from '@angular/core';
import {MovieEvent} from '../models/movieEvent.model.client';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../services/event.service';
import {BookingService} from '../services/booking.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: MovieEvent;
  booked = false;
  eventId = '';
  userId = '';

  constructor(private eventService: EventService,
              private userService: UserService,
              private bookingService: BookingService,
              private route: ActivatedRoute) {
    this.booked = false;
    this.route.params.subscribe(param => {
      // console.log('PARAMS: ', param);
      this.eventId = param.eventId;
      console.log("Event ID: ", this.eventId);})
    this.fetchEventDetail(this.eventId);
    this.userService.findLoggedUser()
      .then( (user) => {
        this.userId = user['_id'];
      })

  }

  fetchEventDetail(eventId) {
    this.event = new MovieEvent();
    this.eventService.findEventById(eventId)
      .then((response) => {
        console.log("EVENT", response);
        this.event.name = response[0]['name'];
        this.event.location = response[0]['location'];
        this.event.movies = response[0]['movies'];
        this.event.time = response[0]['time'];
        this.event.date = response[0]['date'];
        this.event.id = response[0]['id'];
        console.log(this.event);
      })
  }

  bookEvent(){
    console.log('Create booking with event ID: ', this.event.id);
    this.booked = !this.booked;


    // this.bookingService.createBooking(this.event.id)
    //   .then((response) => {
    //     console.log(response);
    //   })
  }


  unbookEvent(){
    console.log('Delete booking for event ID: ', this.event.id);
    this.booked = !this.booked;
    // this.bookingService.deleteBooking(this.event.id)
    //   .then((response) => {
    //     console.log(response);
    //   })
  }




  ngOnInit() {
  }

}
