import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../user-data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _userservice: UserDataService) { }

  user;

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._userservice.currentUser.subscribe(user => {
      this.user = user.data
      console.log("I am now calling from the dashboard from component" , this.user);
    }, err => {
      console.log(err);
    });
  }
}
