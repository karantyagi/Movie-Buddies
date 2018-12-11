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
  email: string;

  constructor(private router: Router, private service: UserService) {
    this.usernameExists = false;
  }


  register(username, password, role, email) {
    let user;
      user = {username, password, role, email};
    this.service
      .register(user)
      .then((res) => {

          if (res.status === true) {
            if (role === 'Guest') {
              this.router.navigate(['profile-guest']);
            }
            else if (role === 'Host'){
              this.router.navigate(['profile-host']);
            }
            else {
              this.usernameExists = false;
              this.role = 'Guest';
            }
          }
          else {
            this.usernameExists = true;
            this.role = 'Guest';
          }
        }
      );
  }

  ngOnInit() {
  }

}
