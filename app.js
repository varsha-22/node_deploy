// app.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var mongoose = require('mongoose');


// configuration ===========================================

process.env.PWD = process.cwd()
// config files

// set our port
var port = process.env.PORT || 8080; 
// Set native promises as mongoose promise
// mongoose.Promise = global.Promise;
// // const mongoUrl =
// //   process.env.MONGO_URL ||
// //   "mongodb+srv://Varsha:varsha22#@cluster0.9lusy.mongodb.net/node_deploy";
// // MongoDB Connection
// if (process.env.NODE_ENV !== 'test') {
//   mongoose.connect(process.env.MONGO_URL, (error) => {
//     if (error) {
//       console.error("Please make sure Mongodb is installed and running!"); // eslint-disable-line no-console
//       throw error;
//     }

//     // feed some dummy data in DB.
//     dummyData();
//   });
// }

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(process.env.MONGO_URL); 
mongoose.connect(process.env.MONGO_URL, {
  useMongoClient: true,
  /* other options */
});

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://Varsha:varsha22#@cluster0.9lusy.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//   const collection = client.db("node_deploy").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.use(cors())

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 
app.use(express.static('public'));

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 


// routes ==================================================
require('./app/routes')(app); // configure our routes
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;   
