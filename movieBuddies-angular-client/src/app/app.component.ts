import { Component } from '@angular/core';
import {User} from './models/user.model.client';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieBuddies-angular-client';
  user: User = null;


  constructor(private userService: UserService, private router: Router) {
    // this.router.events.subscribe(() => this.sessionCheck());
    this.sessionCheck();

  }

  sessionCheck() {
    this.userService.findLoggedUser().then((user) => {
      this.user = user;
      console.log('logged in USER : ' , user);
    });
  }

  logout() {

    this.userService.logout().then(() => this.router.navigate(['*']))
      .then(() =>
        this.userService.findLoggedUser().then((user) => this.user = user));

  }
}

