import {StockPricesService} from "../stock-prices.service";
import {Router} from "@angular/router";
import {Chart} from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import {AfterViewInit, OnInit, Component, Directive, QueryList, ViewChildren} from '@angular/core';
import {FormsModule} from "@angular/forms";
import 'rxjs/add/operator/takeWhile';
import {UserDataService} from "../user-data.service";


@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.css']
})
export class CryptoDetailComponent implements OnInit {


  ngOnInit() {
    this.intradayCryptoData()
  }

//Update chart with changes polled by the Timer Observable

  updateChart(chart, dates, closedprice) {

    console.log("Chart is ", chart.data);
    chart.data.labels.push(dates[dates.length - 1]);
    chart.data.datasets[0].data.push(closedprice[closedprice.length - 1]);
    chart.update();
    console.log("Chart Update called");

  }

  chart = [];

  i = 0;

  staticData: any;
  dynamicData: any;
  dates = [];
  symbol = [];
  closedprice = [];
  oldDate: any;
  currentDate: any;
  errorMsg: string;
  length = [];
  stockName = "";

  private display: boolean; // whether to display info in the component
  // use *ngIf="display" in your html to take
  // advantage of this

  private intradayAlive: boolean;// used to unsubscribe from the TimerObservable
  // // when OnDestroy is called.

  private interval: number;
  private dynamicDates: any;
  stockupdatedvalue;

  constructor(private _stockService: StockPricesService, private router: Router, private _userservice: UserDataService) {

    this.display = false;
    this.intradayAlive = true;
    this.interval = 60000;
    this.stockupdatedvalue = 0;
  }


  //Get daily crypto data by subscribing to the server URL

  dailyCryptoData() {


    this._stockService.currentStock.subscribe(searchString => {


      this._stockService.getDailyCryptoPrice(searchString).subscribe(data => {

        this.staticData = JSON.stringify(data);
        this.stockName = searchString;
        this.dates = JSON.parse(this.staticData).Dates;
        this.closedprice = JSON.parse(this.staticData).Prices;

        console.log("Length of dates is ", this.dates.length);
        console.log("Length of prices is ", this.closedprice.length);
        console.log("Dates is ", this.dates);
        this.oldDate = this.dates[this.dates.length - 1];
        console.log("Last date is ", this.oldDate);


        this.createChart(this.dates,this.closedprice)



      }, APIError => {
        this.errorMsg = APIError["message"];
        console.log("API Error is ", APIError["message"])
      })


    })

  }

  //Get monthly crypto data by subscribing to the server

  monthlyCryptoData()
  {

    console.log("Monthly Crypto Data called due to button click");
    //this.setAliveStatus(false,false,false,true)


    this._stockService.currentStock.subscribe(searchString => {


      this._stockService.getMonthlyCryptoPrice(searchString).subscribe(data => {

        this.staticData = JSON.stringify(data);
        this.stockName = searchString;
        this.dates = JSON.parse(this.staticData).Dates;
        this.closedprice = JSON.parse(this.staticData).Prices;

        console.log("Length of dates is ", this.dates.length);
        console.log("Length of prices is ", this.closedprice.length);
        console.log("Dates is ", this.dates);
        this.oldDate = this.dates[this.dates.length - 1];
        console.log("Last date is ", this.oldDate);
        this.createChart(this.dates,this.closedprice)


      })


    })


  }


////Get intraday crypto data by subscribing to the server

  intradayCryptoData()
  {

    this._stockService.currentStock.subscribe(searchString => {


      this.intradayAlive = true;


      this._stockService.getIntradayCryptoPrice(searchString).subscribe(data => {



        this.staticData = JSON.stringify(data);
        this.stockName = searchString;
        this.dates = JSON.parse(this.staticData).Dates;
        this.closedprice = JSON.parse(this.staticData).Prices;

        console.log("Length of dates is ", this.dates.length);
        console.log("Length of prices is ", this.closedprice.length);
        console.log("Dates is ", this.dates);
        this.oldDate = this.dates[this.dates.length - 1];
        console.log("Last date is ", this.oldDate);

        this.createChart(this.dates,this.closedprice)


        //Creates a Timer Observable which polls every interval ms before sending another request

        TimerObservable.create(0, this.interval)
          .takeWhile(() => this.intradayAlive)
          .subscribe(() => {
            console.log("In the timer observable");
              this._stockService.currentStock.subscribe(searchString => {
                this._stockService.getIntradayCryptoPrice(searchString)
                  .subscribe(data => {

                    this.dynamicData = JSON.stringify(data);
                    this.dynamicDates = JSON.parse(this.dynamicData).Dates;
                    this.currentDate = this.dynamicDates[this.dynamicDates.length - 1];

                    if (this.oldDate === this.currentDate) {
                      console.log("Old Date is ", this.oldDate, " and new date is ", this.currentDate);
                      console.log("Data has not changed");

                    }
                    else {
                      console.log("Old Date is ", this.oldDate, " and new date is ", this.currentDate);
                      this.closedprice = JSON.parse(this.dynamicData).Prices;
                      this.updateChart(this.chart, this.dynamicDates, this.closedprice);
                      this.oldDate = this.currentDate;
                    }


                  })

              })
            },
            APIError => {
              this.errorMsg = APIError["message"];
              console.log("API Error is ", APIError["message"])
            })

      })


    })
  }


//Get weekly crypto data by subscribing to the server

  weeklyCryptoData()
  {

    //this.setAliveStatus(false,false,true,false)

    this._stockService.currentStock.subscribe(searchString => {


      this._stockService.getWeeklyCryptoPrice(searchString).subscribe(data => {

        this.staticData = JSON.stringify(data);
        this.stockName = searchString;
        this.dates = JSON.parse(this.staticData).Dates;
        this.closedprice = JSON.parse(this.staticData).Prices;

        console.log("Length of dates is ", this.dates.length);
        console.log("Length of prices is ", this.closedprice.length);
        console.log("Dates is ", this.dates);
        this.oldDate = this.dates[this.dates.length - 1];
        console.log("Last date is ", this.oldDate);

        this.createChart(this.dates,this.closedprice)


      })



    })
  }

  updatethebitdata(quantity)
  {
    console.log("Again from update the data with the stock name : " +this.stockName);
    let currentvalue;
    this._stockService.currentbitPrices(this.stockName).subscribe(data => {
      currentvalue = data;
      console.log("I want the current value of the data of the bit stock : " + currentvalue);
      this._userservice.userupdate(this.stockName, currentvalue, quantity);
      this.stockupdatedvalue = 1;

    })

  }


//Creates a chart with the dates and closedprice list

  createChart(dates, closedprice)
  {

    let red = "#B93B56";
    let green = "#2A8471";
    let color = "";

    if (this.closedprice[0] < this.closedprice[closedprice.length - 1]) {
      color = green;
      console.log("closedprice[0] is ", this.closedprice[0], " and closedprice[closedprice.length-1] is ", this.closedprice[closedprice.length - 1],
        " hence the green color is ", color)
    }
    else {
      color = red;
      console.log("closedprice[0] is ", this.closedprice[0], " and closedprice[closedprice.length-1] is ", this.closedprice[closedprice.length - 1],
        " hence the red color is ", color)
    }

    this.chart = new Chart('canvas', {

        type: 'line',
        data: {

          labels: dates,

          datasets: [
            {
              data: closedprice,
              borderColor: color,
              fill: false,
              label: 'Price'
            },


          ],
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        }
      }
    )


  }









}
