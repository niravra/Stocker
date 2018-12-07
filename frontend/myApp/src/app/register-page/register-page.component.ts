import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../user-data.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  registration;
  constructor(private _userservice: UserDataService) {
    this.registration = 0;
  }

  ngOnInit() {
  }

  createnewuser(fname,email,pass){


    console.log("Inside user create")
    // if(fname == '' || lname == '' || email =='' || ssn == '' || pass == '' || repass == ''){
    //   alert("PLease Note all fields are mandatory");
    // }

    this._userservice.usercreate(fname, email, pass);
    // console.log("REgister button working : ", fname,lname,email,ssn,pass,repass)
    this.registration = 1;

  }
}
