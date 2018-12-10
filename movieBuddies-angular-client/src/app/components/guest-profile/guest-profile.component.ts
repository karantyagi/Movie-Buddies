import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.css']
})
export class GuestProfileComponent implements OnInit {

  updateMode = false;

  constructor() { }

  startUpdateMode(){
    this.updateMode = true;
  }

  cancelUpdateMode(){
    this.updateMode = false;
  }

  ngOnInit() {
  }

}
