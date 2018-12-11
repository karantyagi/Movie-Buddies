import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {LoginResponse} from '../../models/response/loginResponse.model.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  badUserNamePass: boolean;
  loginResponse: LoginResponse = new LoginResponse();
  constructor(private router: Router, private userService: UserService) {
    this.badUserNamePass = false; }

  login(username, password) {

    this.userService
      .login(username, password)
      .then((obj) => {
        console.log("Logging in : ", obj);
        if (obj.status == 'success') {
          this.loginResponse.role = obj['role'];
          if (this.loginResponse.role === 'Guest' ) {
            this.router.navigate(['profile-guest']);
          } else if (this.loginResponse.role === 'Admin' ) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['profile-host']);
          }

        } else if (obj.status == 'user does not exists') {
          this.badUserNamePass = true;
        } else {
          this.badUserNamePass = false;
        }
      });
  }

  ngOnInit() {
  }

}
