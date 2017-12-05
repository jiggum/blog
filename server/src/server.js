var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
require("babel-core/register");
require("babel-polyfill");
var graphqlHTTP = require('express-graphql');
var schema = require('./graphql/schema').default;
var User = require('./mongoose/user').default;
var { ENV }  = require('./config');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// start the server
mongoose.connect('mongodb://localhost:27017/local')
var db = mongoose.connection;
db.on('error', ()=> {coSnsole.log( '---FAILED to connect to mongoose')})
db.once('open', () => {
 console.log( '+++Connected to mongoose')
})

app.listen(3000,()=> {console.log("+++Express Server is Running!!!")})

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
 })

app.use('/graphql', graphqlHTTP (req => ({
  schema,
  graphiql: ENV !== "production"
 })))