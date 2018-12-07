import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../user-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private _userservice: UserDataService, private router: Router) {
    this.wronglogin = 0;
  }

  userdata;
  wronglogin;
  ngOnInit() {
  }


  loginauthenticate(email, password) {

    this._userservice.userauthenticate(email, password);
    this.getUser();
      console.log("I am excited" , this.userdata);
    // console.log(this.userdata);
  }

  getUser() {
    this._userservice.currentUser.subscribe(user => {
      this.userdata = user
      this.wronglogin = 10;
      this.routetodashboard(user);
    }, err => {
      console.log(err);
    });
  }

  routetodashboard(data) {
    if (data.status === 200) {
      if (data.data.isAdmin) {
        this.router.navigate(['/', 'admin']);
      }
      else {
        this.router.navigate(['/', 'dashboard']);
      }
    }

      else
        {

          this.wronglogin = 1;
    }
  }

}

