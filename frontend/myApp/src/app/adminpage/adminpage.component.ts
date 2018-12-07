import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../user-data.service";

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  private ngtabledata: any[];
  constructor(private _userservice: UserDataService) { }

  user;

  allusers;

  ngOnInit() {
    this.getUser();
    this.getallusers();
  }

  getUser() {
    this._userservice.currentUser.subscribe(user => {
      this.user = user.data
      console.log("I am now calling from the dashboard from component" , this.user);
    }, err => {
      console.log(err);
    });
  }

  getallusers(){
    this._userservice.getalluser().subscribe(users => {
      this.allusers = users;
      this.setallusersdata(users);

    }, err => {
      console.log(err);
    })
  }

  setallusersdata(data){
    this.ngtabledata = data.data.docs;
    console.log("I am from admin : ", this.ngtabledata)

  }
}
