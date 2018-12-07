import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {HttpModule} from '@angular/http';
import {StockPricesService} from '../stock-prices.service';
import 'rxjs/add/operator/map';
// import {newsFeedModel} from '../model/newsFeed.model';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  newsArray= [];
  newsJSON={};

  constructor(private _stockAPIservive:StockPricesService) { }
  // newsDisplayArr=[{"title":" ","url":" "}];
  newsDisplayArr=[];
  ngOnInit() {
    this.newsDisplayArr;
    this.getNewsFeed();
  }
  getNewsFeed()
  {
    ///getNewsFeed is method that returns
    let res;
    //  let newsTitle;
    this._stockAPIservive.getNewsData().subscribe(newsdata => {
      // newsJSON = JSON.parse(this.newsdata);
      res = JSON.stringify(newsdata);
      console.log("News array is",newsdata);
      this.newsArray=JSON.parse(res).articles;
      console.log("News array is",this.newsArray);

      for(let i = 0; i<3;i++)
      {

        let JSON={};
        JSON["title"]=this.newsArray[i].title
        JSON["url"]=this.newsArray[i].url
        JSON["urlToImage"]=this.newsArray[i].urlToImage

        this.newsDisplayArr.push(JSON)

        console.log("Display Array updated",this.newsDisplayArr);
      }
    })

  }

}
