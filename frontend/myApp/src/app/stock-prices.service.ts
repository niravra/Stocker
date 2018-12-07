import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Rx';
import {errorHandler} from "@angular/platform-browser/src/browser";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class StockPricesService {



  private stockIdSource = new BehaviorSubject<any>(0);
  currentStock = this.stockIdSource.asObservable();
  private stockIdType = new BehaviorSubject<any>(0);
  stockType = this.stockIdType.asObservable();

  searchString: any;


  //stockDailyPrices
  private defaultUrl = "http://localhost:3100/stocks/stockHome";

  private weeklyUrl = "http://localhost:3100/stocks/stockWeeklyPrices?symbol=";
  private dailyUrl = "http://localhost:3100/stocks/stockDailyPrices?symbol=";
  private intradayUrl = "http://localhost:3100/stocks/stockIntradayPrices?symbol=";
  private getstockvalueurl = "http://localhost:3100/stocks/stockPrices?symbol=";
  private getbitvalueurl = "http://localhost:3100/stocks/cryptoPrices?symbol=";


  //private testUrl="http://localhost:3100/stocks/currentTime"

  constructor(private _http: HttpClient) {
  }


  setSearchString(searchString)
  {
    this.stockIdSource.next(searchString);
    console.log("Current stock is ", this.currentStock);
  }

  setStockType(type)
  {
    this.stockIdType.next(type);
    console.log("Current stock is ", this.stockType);
  }


  // --------------------- Stock Routes --------------------------------------

  getIntradayStockPrice(search)
  {

    //router.get('/stockIntradayPrices',stockController.getIntradayStockValues);

    let url="http://localhost:3100/stocks/stockIntradayPrices?symbol="+search
    return this._http.get(url)
      .map(result => result)
      .catch(this._errorHandler)
  }


  getWeeklyStockPrice(search)
  {

    let url="http://localhost:3100/stocks/stockWeeklyPrices?symbol="+search
    return this._http.get(url)
      .map(result => result)
      .catch(this._errorHandler)
  }


  getMonthlyStockPrice(search)
  {

    let url="http://localhost:3100/stocks/stockMonthlyPrices?symbol="+search
    return this._http.get(url)
      .map(result => result)
      .catch(this._errorHandler)
  }




  getDailyStockPrice(search)
  {

    let url="http://localhost:3100/stocks/stockDailyPrices?symbol="+search
    return this._http.get(url)
      .map(result => result)
      .catch(this._errorHandler)
  }


  defaultStockPrices()
  {
    return this._http.get(this.defaultUrl)
      .map(result => result)
      .catch(this._errorHandler)

  }



  //---------------------------------Crypto Routes------------------------------

  getIntradayCryptoPrice(search)
  {

    //router.get('/stockIntradayPrices',stockController.getIntradayStockValues);

    let url="http://localhost:3100/stocks/cryptoIntradayPrices?symbol="+search
    return this._http.get(url)
      .map(result => result)
      .catch(this._errorHandler)
  }


  getWeeklyCryptoPrice(search)
  {

    let url="http://localhost:3100/stocks/cryptoWeeklyPrices?symbol="+search
    return this._http.get(url)
      .map(result => result)
      .catch(this._errorHandler)
  }


  getMonthlyCryptoPrice(search)
  {

    let url="http://localhost:3100/stocks/cryptoMonthlyPrices?symbol="+search
    return this._http.get(url)
      .map(result => result)
      .catch(this._errorHandler)
  }




  getDailyCryptoPrice(search)
  {

    let url="http://localhost:3100/stocks/cryptoDailyPrices?symbol="+search
    return this._http.get(url)
      .map(result => result)
      .catch(this._errorHandler)
  }




  _errorHandler(error: Response){

    let newError= new Error("Server Error. Could not fetch the data. Please try after sometime.")
    return Observable.throw(newError || "Server Error");

  }


  currentStockPrices(search)
  {
    let url = this.getstockvalueurl+search;
    return this._http.get(url)
      .map(result => result)
      .catch(this._errorHandler)

  }

  currentbitPrices(search)
  {
    let url = this.getbitvalueurl+search;
    return this._http.get(url)
      .map(result => result)
      .catch(this._errorHandler)

  }

  //news feed API call
  getNewsData(){
    return this._http.get("https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=")
      .map(res => res)
  }
}





