var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
import schema from './graphql/schema';
import graphqlHTTP from 'express-graphql';
import User from'./mongoose/user';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// start the server
mongoose.connect('mongodb://localhost:27017/local')
var db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', () => {
 console.log( '+++Connected to mongoose')
})

app.listen(3000,()=> {console.log("+++Express Server is Running!!!")})

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
 })
 
app.post('/quotes',(req,res)=>{
  // Insert into TodoList Collection
  console.log('req.body', req.body);
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    role: 'user'
  })
  user.save((err, result)=> {
    if (err) {
      console.log(`---User save failed: ${err.errmsg}`)
      res.send(err.errmsg);
      return;
    }
    console.log(`+++User saved successfully: ${user.email}`);
    res.send(user.email);
  })
})

app.use('/graphql', graphqlHTTP (req => ({
  schema
  ,graphiql:true
 })))