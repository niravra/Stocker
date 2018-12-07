Stocker

Stocker is a MEAN Stack Application which enables the user to purchase/sell stocks and cryptocurrency at real time prices. The application uses Angular4 for the frontend, NodeJS and Express for the backedn server and MongoDB for the backend database.


Features:

1. Buy/Sell stocks or cryptocurrencies at real time prices
2. Get latest stock related  news feed on the Homepage.
3. Shows trending stocks on the user dashboard
4. User can make their own account for purchasing/selling stocks and maintaining his portfolio.
5. Live insights of daily ,monthly and weekly prices are displayed using Live Graphs


External APIs:

1. Alphavantage API for stocks and cryptocurrency pricing
2. NewsAPI.org for related news



The Project is divided into two parts - 
  Frontend
  Backend

Installation process required to run the project:

1. install angular in folder 'frontend' using command 'npm install -g @angular/cli@latest'
2. install chart.js in folder 'frontend' using command 'npm install chart.js --save'
3. install express in folder 'backend->appserver' using command 'npm install express -session --save'
4. install request in folder 'backend->appserver' using npm install --save request, npm install --save request-promise,npm install async-  each 


Steps to run the project:

1. Install MongoDB. Detailed steps mentioned in https://docs.mongodb.com/manual/installation/

2. Start mongodb

3. Open the project in any IDE of your choice 

4. Go to backend-> appserver and enter 'node app.js' to run the web server

5. Go to frontend->MyApp run and enter 'ng serve' to run application server
  


