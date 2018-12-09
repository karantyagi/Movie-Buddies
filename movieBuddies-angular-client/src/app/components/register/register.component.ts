import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  verifyPassword: string;
  usernameExists: boolean;
  role = 'Guest';
  successMsg: boolean;
  email: string;

  constructor(private router: Router,
              private service: UserService) {
    this.usernameExists = false;
    this.successMsg = false;
  }


  register(username, password, role, email) {
    let user;
    if (role === 'Host') {
      user = {username, password, role, email};
    } else {
      user = {username, password, role};
    }
    this.service
      .register(user)
      .then((res) => {

          if (res.status === true) {
            if (role === 'Guest') {
              this.router.navigate(['profile-guest']);
            } else {
              this.successMsg = true;
              this.usernameExists = false;
              this.role = 'Guest';
            }
          } else {

            this.usernameExists = true;
            this.role = 'Guest';
            this.successMsg = false;
          }
        }
      );
  }

  ngOnInit() {
  }

}
