import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { StockApiComponent } from './stock-api/stock-api.component';

import {StockPricesService} from './stock-prices.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import {UserDataService} from "./user-data.service";
import {FormsModule} from "@angular/forms";
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { CryptoDetailComponent } from './crypto-detail/crypto-detail.component';
import {DataTableModule} from "ng2-data-table";
import { AdminpageComponent } from './adminpage/adminpage.component';

const routes: Routes = [
  {
    path:'',
    component:HomepageComponent
  },
  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path:'register',
    component:RegisterPageComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'stockdetail',
    component:StockDetailComponent
  },
  {
    path:'cryptodetail',
    component:CryptoDetailComponent
  },
  {
    path:'admin',
    component:AdminpageComponent
  }


];


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    StockApiComponent,
    HomepageComponent,
    DashboardComponent,
    NavigationBarComponent,
    StockDetailComponent,
    CryptoDetailComponent,
    AdminpageComponent,

    // HttpClientModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // NgbModule.forRoot()

    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    DataTableModule

  ],
  providers: [StockPricesService, UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
