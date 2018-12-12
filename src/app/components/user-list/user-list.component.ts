import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model.client';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  user: User = new User();
  guestusers:User[] = [];
  following =[];

  constructor(private userService: UserService, private router: Router) {
    this.sessionCheck();
    this.userService.findAllUsers()
      .then( (response) =>
      {
        console.log(response);
        response.forEach((u) => {
          this.guestusers = this.guestusers.concat(u);
        });
        this.guestusers = this.guestusers.filter((obj) =>
          (obj.role === 'Guest' && obj.username != this.user.username));
        console.log('All Guests : ', this.guestusers);
      })
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
        console.log('All users followed by this user: ', this.following);
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

  updateFollowing(id){
    // console.log('Add to following: ', id);
    this.user.follows = this.user.follows.concat(id);
    this.userService.updateUserProfile(this.user)
      .then( (result) => {
        this.sessionCheck();
      })
  }

  followsUser(userId){
    let success =false;
    console.log("Guest id", userId)
    this.user.follows.forEach((uId) => {
      if(uId == userId){
        console.log(uId, ' FOUND');
        success = true;
      }
    });
      return  success;
  }



  ngOnInit() {
  }

}
