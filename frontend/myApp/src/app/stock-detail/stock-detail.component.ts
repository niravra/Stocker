import {StockPricesService} from "../stock-prices.service";
import {Router} from "@angular/router";
import {Chart} from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import {AfterViewInit, OnInit, Component, Directive, QueryList, ViewChildren} from '@angular/core';
import {FormsModule} from "@angular/forms";
import 'rxjs/add/operator/takeWhile';

import set = Reflect.set;
import {routerNgProbeToken} from "@angular/router/src/router_module";
import {UserDataService} from "../user-data.service";


@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {


  updateChart(chart, dates, closedprice) {

    console.log("Chart is ", chart.data);
    chart.data.labels.push(dates[dates.length - 1]);
    chart.data.datasets[0].data.push(closedprice[closedprice.length - 1]);
    chart.update();
    console.log("Chart Update called");

  }


  chart = [];
  chartReady = false;
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
  user;
  stockupdatedvalue;
  private display: boolean; // whether to display info in the component
  // use *ngIf="display" in your html to take
  // advantage of this

  private dailyAlive: boolean; // used to unsubscribe from the TimerObservable
  // when OnDestroy is called.

  private intradayAlive: boolean;

  private interval: number;
  private dynamicDates: any;



  constructor(private _stockService: StockPricesService, private router: Router, private _userservice: UserDataService) {



    this.display = false;
    this.intradayAlive = true;
    this.stockupdatedvalue = 0;
    this.interval = 60000;

  }

  ngOnInit() {

    this.intradayStockData();
  }


  // setAliveStatus(intradayAlive, dailyAlive,weeklyAlive, monthlyAlive ) {
  //
  //   this.intradayAlive=intradayAlive
  //   this.monthlyAlive=monthlyAlive
  //   this.dailyAlive=dailyAlive
  //   this.weeklyAlive=weeklyAlive
  //
  // }
  //
  //
  // getIntradayAliveStatus()
  // {
  //
  //   return this.intradayAlive;
  //
  // }
  //
  // getmonthlyAliveStatus()
  // {
  //
  //   return this.monthlyAlive;
  //
  // }
  //
  // getWeeklyAliveStatus()
  // {
  //
  //   return this.weeklyAlive;
  //
  // }
  //
  // getDailyAliveStatus()
  // {
  //
  //   return this.dailyAlive;
  // }
  //

  dailyStockData (){

   // this.intradayAlive = false;
   // this.monthlyAlive= false;
   // this.dailyAlive= true;
   // this.weeklyAlive= false;


//   this.setAliveStatus(false,true,false,false)

   this._stockService.currentStock.subscribe(searchString => {


     this._stockService.getDailyStockPrice(searchString).subscribe(data => {

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

     },APIError => {
       this.errorMsg = APIError["message"];
       console.log("API Error is ", APIError["message"])
     })


     })

 }



monthlyStockData()
{

  console.log("Monthly Stock Data called due to button click");


  //this.setAliveStatus(false,false,false,true)

  this._stockService.currentStock.subscribe(searchString => {


    this._stockService.getMonthlyStockPrice(searchString).subscribe(data => {

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

    //  this.monthlyAlive=this.getmonthlyAliveStatus();
    //   TimerObservable.create( this.interval)
    //     .takeWhile(() => this.monthlyAlive)
    //     .subscribe(() => {
    //   //      this.monthlyAlive=this.getmonthlyAliveStatus();
    //         this._stockService.currentStock.subscribe(searchString => {
    //           this._stockService.getMonthlyStockPrice(searchString)
    //             .subscribe(data => {
    //
    //               this.dynamicData = JSON.stringify(data);
    //               this.dynamicDates = JSON.parse(this.dynamicData).Dates;
    //               this.currentDate = this.dynamicDates[this.dynamicDates.length - 1];
    //
    //               console.log("In the monthly observable and monthly alive is ", this.monthlyAlive)
    //               if (this.oldDate === this.currentDate) {
    //                 console.log("Old Date is ", this.oldDate, " and new date is ", this.currentDate);
    //                 console.log("Data has not changed");
    //
    //               }
    //               else {
    //                 console.log("Old Date is ", this.oldDate, " and new date is ", this.currentDate);
    //                 this.closedprice = JSON.parse(this.dynamicData).Prices;
    //                 this.updateChart(this.chart, this.dynamicDates, this.closedprice);
    //                 this.oldDate = this.currentDate;
    //               }
    //
    //
    //             })
    //
    //         })
    //       },
    //       APIError => {
    //         this.errorMsg = APIError["message"];
    //         console.log("API Error is ", APIError["message"])
    //       })

    })


  })


}



intradayStockData()
{



  this._stockService.currentStock.subscribe(searchString => {


    // this.intradayAlive = true;
    // this.monthlyAlive= false;
    // this.dailyAlive= false;
    // this.weeklyAlive= false;

    //this.setAliveStatus(true,false,false,false)


    this._stockService.getIntradayStockPrice(searchString).subscribe(data => {



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

      TimerObservable.create(0, this.interval)
        .takeWhile(() => this.intradayAlive)
        .subscribe(() => {
            this._stockService.currentStock.subscribe(searchString => {
              this._stockService.getIntradayStockPrice(searchString)
                .subscribe(data => {

                  console.log("In the intraday observable and intraday alive is ", this.intradayAlive)
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
this.getUser();

  })
}


  getUser() {
    this._userservice.currentUser.subscribe(user => {
      this.user = user.data
      console.log("I am now calling from the main api component mind it" , this.user);
    }, err => {
      console.log(err);
    });
  }




//Get Weekly Stock Data
  weeklyStockData()
  {


    //this.setAliveStatus(false,false,true,false)

    this._stockService.currentStock.subscribe(searchString => {


      this._stockService.getWeeklyStockPrice(searchString).subscribe(data => {

        this.staticData = JSON.stringify(data);
        this.stockName = searchString;
        this.dates = JSON.parse(this.staticData).Dates;
        this.closedprice = JSON.parse(this.staticData).Prices;

        console.log("Length of dates is ", this.dates.length);
        console.log("Length of prices is ", this.closedprice.length);
        console.log("Dates is ", this.dates);
        this.oldDate = this.dates[this.dates.length - 1];
        console.log("Last date is ", this.oldDate);

        this.createChart(this.dates, this.closedprice)

      //  this.weeklyAlive = this.getWeeklyAliveStatus();

        // TimerObservable.create(this.interval)
        //   .takeWhile(() => this.weeklyAlive)
        //   .subscribe(() => {
        //       this.weeklyAlive = this.getWeeklyAliveStatus();
        //       this._stockService.currentStock.subscribe(searchString => {
        //         this._stockService.getWeeklyStockPrice(searchString)
        //           .subscribe(data => {
        //
        //             console.log("In the weekly observable and weekly alive is ", this.weeklyAlive)
        //
        //             this.dynamicData = JSON.stringify(data);
        //             this.dynamicDates = JSON.parse(this.dynamicData).Dates;
        //             this.currentDate = this.dynamicDates[this.dynamicDates.length - 1];
        //
        //             if (this.oldDate === this.currentDate) {
        //               console.log("Old Date is ", this.oldDate, " and new date is ", this.currentDate);
        //               console.log("Data has not changed");
        //
        //             }
        //             else {
        //               console.log("Old Date is ", this.oldDate, " and new date is ", this.currentDate);
        //               this.closedprice = JSON.parse(this.dynamicData).Prices;
        //               this.updateChart(this.chart, this.dynamicDates, this.closedprice);
        //               this.oldDate = this.currentDate;
        //             }
        //
        //
        //           })
        //
        //       })
        //     },
        //     APIError => {
        //       this.errorMsg = APIError["message"];
        //       console.log("API Error is ", APIError["message"])
        //     })

      })
    })}

      updatethestockdata(quantity)
      {
        console.log("Entered the stock para")
        let currentvalue;
        this._stockService.currentStockPrices(this.stockName).subscribe(data => {
          currentvalue = data;
          console.log("I want the current value of the data of the stock : " + currentvalue);
          this._userservice.userupdate(this.stockName, currentvalue, quantity);
          this.stockupdatedvalue = 1;

        })

      }

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

        this.chartReady=true;
      }

}

