import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model.client';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.css']
})
export class HostProfileComponent implements OnInit {

  user: User = new User();
  constructor(private userService: UserService, private router: Router) {
    this.sessionCheck();
  }

  update(){
    console.log('Update the user as : ', this.user);
    this
      .userService.updateUserProfile(this.user)
      .then(() => {
        // alert('Profile updated !');
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

  ngOnInit() {
  }

}
