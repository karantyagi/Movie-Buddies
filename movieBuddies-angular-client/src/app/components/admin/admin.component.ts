import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model.client';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    this.user.username = 'No session maintained';
    this.sessionCheck();
    this.findAllUsers();
    this.role ="default";
  }

  user: User = new User();
  updateUserObj:User;
  users: User;
  currentAdmin: User;
  allGuests = [];
  allUsers: User[];
  username: string;
  password: string;
  role: string;
  usernameExists = false;
  toggleUpdate = true;

  ngOnInit() {
    // this.fetchPendingUser();
  }

  // fetchPendingUser() {
  //   this.userService.findPendingRecruiters().then((user) => this.users = user).then(() => this.findAllUsers());
  // }

  findAllUsers() {
    this.userService.findAllUsers().then((users) => {
      this.allUsers = users;
      this.allGuests = users.filter((user) => user.role === 'Host' && user.premiumRequestStatus);
    }).then(() => this.userService.findLoggedUser().then((user) =>
      this.currentAdmin = user));
  }

  // approveUser(id) {
  //   this.userService.approveRecruiter(id).then(() => this.fetchPendingUser());
  // }
  //
  // rejectUser(id) {
  //   this.userService.rejectRecruiter(id).then(() => this.fetchPendingUser());
  // }

  // grantPremiumAccess(id) {
  //   this.userService.grantPremiumAccess(id).then(() => this.findAllUsers());
  // }
  //
  // revokePremiumAccess(id) {
  //   this.userService.revokePremiumAccess(id).then(() => this.findAllUsers());
  // }

  deleteUser(id) {
    this.userService.deleteUser(id).then(() => this.findAllUsers());
  }

  updateUser() {
    this.updateUserObj.username = this.username;
    this.updateUserObj.password = this.password;
    this.updateUserObj.role = this.role;
    this.toggleUpdate = !this.toggleUpdate;
    this.userService.updateUserProfile(this.updateUserObj).then(() => this.findAllUsers()).then(() => this.toggleUpdate = !this.toggleUpdate );
  }

  createUser(username, password) {

    const role = this.role;
    this.userService.createUser({username, password, role}).then((res) => {
      if (res.status === true) {
        this.findAllUsers();
        this.usernameExists = false;
      } else {
        this.usernameExists = true;
      }
    });
  }

  sessionCheck() {
    this.user.username = 'No session maintained';
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

  modify(user: User) {
    this.username = user.username;this.password=user.password;this.role = user.role;this.updateUserObj=user;
    this.toggleUpdate=!this.toggleUpdate;
  }
}
