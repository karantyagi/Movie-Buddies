import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model.client';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieDetail} from '../../models/movieDetail.model.client';
import {MovieService} from '../../services/movie.service';
import {BookingDetail} from '../../models/bookingDetail.model.client';
import {BookingService} from '../../services/booking.service';
import {EventService} from '../../services/event.service';
import {MovieEvent} from '../../models/movieEvent.model.client';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.css']
})
export class GuestDashboardComponent implements OnInit {

  requestedMoviesView = false;
  bookingsView = false;
  user: User = new User();
  guestusers:User[] = [];
  movies: MovieDetail[] = [];
  bookings: BookingDetail[] = [];
  bookingId ='';
  updateBooking :BookingDetail = new BookingDetail();
  updateMode = false;


  constructor(private userService: UserService,
              private movieService: MovieService,
              private bookingService: BookingService,
              private eventService: EventService,
              private router: Router, private route: ActivatedRoute) {
    this.movies = [];
    this.bookings = [];
    this.guestusers = [];
    this.route.params.subscribe(param => {
      console.log('PARAMS: ', param);
      if(param.bookingId === undefined){
        this.updateMode = false;
      }
      else{
        this.bookingsView = true;
        this.bookingId = param.bookingId;
        console.log('BOOKING ID : ', this.bookingId);
        this.bookingService.findBookingById(this.bookingId)
          .then((result) => {
            console.log('RESULT :', result);
            this.updateBooking = result[0];
            console.log('tickets binded : ', this.updateBooking.tickets);
          });
      }
    });
    this.sessionCheck();
  }

  // getBookingDetail(id) {
  //   console.log(" getEventDetails() = Get event by ID");
  //   this.bookingService.findBookingById(id)
  //     .then( (result) => {
  //       this.updateBooking = result;
  //       console.log('bind booking : ', this.updateBooking)
  //     });
  // }




  showRequestedMoviesList() {
    this.requestedMoviesView = true;
    console.log('Requested Movies view :', this.requestedMoviesView);
  }

  showBookingsList() {
    this.bookingsView = true;
    console.log('Bookings view :', this.requestedMoviesView);
  }

  getmoviesForUser(id){
    this.movieService.findMovieByUserId(id)
      .then( (myMovies) => {
        console.log("My Movies: ", myMovies);
        this.movies = myMovies;
      })
  }


  getbookingsForUser(id) {
    this.bookingService.findBookingByUserId(id)
      .then((myBookings) => {
        console.log("My Bookings: ", myBookings);
        this.bookings = myBookings;
      });
  }

  updateBookingTicket(){
    this.bookingService.updateBooking(this.bookingId, this.updateBooking)
      .then( (result) => {
        this.sessionCheck();
      });
  }

  sessionCheck() {
    this.movies = [];
    this.bookings = [];
    this.guestusers = [];
    this.userService.findLoggedUser().then((user) => {
      if(user['username'] == 'No session maintained'){
        console.log("User not in session")
      }
      else{
        console.log('User in session : ', user['username']);
        console.log('ROLE : ', user['role']);
        this.user = user;
        this.getmoviesForUser(this.user.id);
        this.getbookingsForUser(this.user.id);


        console.log(this.user);
        console.log('follows : ', user['follows']);

        user['follows'].forEach( (id) => {
          this.userService.findUserById(id)
            .then((u) => {
              this.guestusers = this.guestusers.concat(u);
              console.log('guest :', u);
            })
        });
        // console.log('Guest followed by this user: ', this.guestusers);
      }
    }
    );
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

  updateUnfollowing(guestId){
    console.log('Unfollow >>>>> ...........', guestId);
    this.user.follows = this.user.follows.filter( (id) => id !== guestId);
    console.log('After Unfollowing arry is >>>>> ...........', this.user.follows);
      this.userService.updateUserProfile(this.user)
        .then( (result) => {
          this.sessionCheck();
        });
  }

  cancelBooking(id) {
    this.bookingService.deleteBooking(id)
      .then( (result) =>
      this.sessionCheck());
  }






  ngOnInit() {
  }

}
