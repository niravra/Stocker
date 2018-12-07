import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UserModel} from "./model/user.model";
import {PortfolioModel} from "./model/Portfolio.model";


@Injectable()
export class UserDataService {

  data: any;
  dataChange: Observable<any>;

  private userIdSource = new BehaviorSubject<any>(0);
  currentUser = this.userIdSource.asObservable();

  public usermodel : UserModel;

  public portfolio : PortfolioModel;


  constructor( private _http: HttpClient) {
      this.usermodel = new UserModel();
      this.portfolio = new PortfolioModel();
  }


  private authenticateurl = "http://localhost:3100/users/authenticate";
  private userdataurl = "http://localhost:3100/users/userdata"
  private userupdateurl = "http://localhost:3100/users/update"
  private logouturl = "http://localhost:3100/users/logout"
  private createuserurl = "http://localhost:3100/users"
  private sortuserurl = "http://localhost:3100/users/recent"
  private getallusersurl = "http://localhost:3100/users/"


  response;
  user;
  UserStatus;

  usercreate(fname, email, pass){
    this._http.post(this.createuserurl, {
      email: email,
      password: pass,
      firstName: fname,


    }).subscribe(data => {
      this.data = data;

      console.log("I am from the service : ", this.data);
    })

  }

  userstockdelete(stockname){

    let length = this.usermodel.portfolio.length;
    let portfolionew = this.usermodel.portfolio;
    // for (let i=0; i< length; i++){
    //   if(portfolionew[i]["stockname"] == stockname){
    //     var index = this.usermodel.portfolio.indexOf(stockname, 0);
    //     if (index > -1) {
    //       this.usermodel.portfolio.splice(index, 1);
    //     }
    //     console.log("Haha you will ne er find")
    //   }
    // }
      for (let entry of this.usermodel.portfolio){
        if (entry === stockname){
          var index = this.usermodel.portfolio.indexOf(entry, 0);
          if (index > -1) {
            this.usermodel.portfolio.splice(index, 1);
          }
          console.log("Haha you will ne er find")
        }
      }
    console.log("ok i am here again : ", this.usermodel.portfolio);

    this._http.post(this.userupdateurl, {
      user: this.usermodel
    }).subscribe(data => {
      this.data = data;
      this.setData(data);
      console.log("I hope the stock is deleted", data);
      this.setuserData(data);
    })

  }

  userauthenticate(user, password){

     this._http.post(this.authenticateurl, {
      email: user,
      password: password
    }).subscribe(data => {
      this.data = data;
      this.setData(data);
       this.setuserData(data);
      console.log("I am from the service : ", this.data);
    })

  }

  userupdate(stockname, stockprice, quantity){

    // this.usermodel.id = userid ;
    this.portfolio.stockname = stockname;
    this.portfolio.stockprice = stockprice;
    this.portfolio.quantity = quantity;

    this.usermodel.portfolio.push(this.portfolio);
    console.log("testing phase in mode", this.usermodel);
    // )
    // this.usermodel.portfolio.push             //push(this.portfolio);
    this._http.post(this.userupdateurl, {
      user: this.usermodel
    }).subscribe(data => {
      this.data = data;
      this.setData(data);
      console.log("Hi I am your last chance", data);
      this.setuserData(data);
    })
  }

  setData(data:any) {
    this.userIdSource.next(data);
    this.user = data;
  }

  setuserData(data:any) {
    this.usermodel.id = data.data._id;
    this.usermodel.email = data.data.email;
    this.usermodel.buyingpower = data.data.buyingpower;
    this.usermodel.firstName = data.data.firstName;
    this.usermodel.lastName = data.data.lastName;
    this.usermodel.portfolio = data.data.portfolio;
    this.usermodel.ssn = data.data.ssn;
  }

  userdata(){
    return this._http.post(this.userdataurl, {}).map(result => result);
  }

  userlogout(){
    this._http.post(this.logouturl,{})
  }

  usersort(){
    return this._http.post(this.sortuserurl,{}).map(result => result);
  }

  getalluser(){
    return this._http.get(this.getallusersurl).map(result => result);
  }
}
