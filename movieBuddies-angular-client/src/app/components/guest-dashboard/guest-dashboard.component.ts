import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.css']
})
export class GuestDashboardComponent implements OnInit {

  requestedMoviesView = false;

  constructor() { }

  showRequestedMoviesList() {
    this.requestedMoviesView = true;
    console.log('Requested Movies view :', this.requestedMoviesView);
  }

  ngOnInit() {
  }

}
