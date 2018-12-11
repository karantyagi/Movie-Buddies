import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model.client';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.css']
})
export class GuestDashboardComponent implements OnInit {

  requestedMoviesView = false;
  bookingsView = false;
  user: User = new User();
  follows: User[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.sessionCheck();
  }

  showRequestedMoviesList() {
    this.requestedMoviesView = true;
    console.log('Requested Movies view :', this.requestedMoviesView);
  }

  showBookingsList() {
    this.bookingsView = true;
    console.log('Bookings view :', this.requestedMoviesView);
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
        console.log('follows : ', user['follows'])
        this.user.follows.forEach((userId) => {
          let u = new User();
          this.userService.findUserById(userId)
            .then((response) => {
              u = user;
              this.follows = this.follows.concat(u);
            })
        })
        console.log('All users followed by this user: ', this.follows);
        ;
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



  unfollowUser(user){
    console.log('originally : ', this.follows);
    let index = this.follows.indexOf(user);
    if (index > -1) {
      this.follows.splice(index, 1);
    }
    console.log('after unfollowing : ', this.follows);
    this.user.follows = [];
    this.follows.forEach( (u) =>{
      this.user.follows =  this.user.follows.concat(u.id);
    });
    this.userService.updateUserProfile(this.user)
      .then((result) => {
        this.sessionCheck();
      }

  )



  }

  ngOnInit() {
    this.sessionCheck();
  }

}
