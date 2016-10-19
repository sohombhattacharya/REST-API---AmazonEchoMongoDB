var mongoose = require("mongoose"); 
var customer = require("../model/customer");
var server = require("../server"); 
var request = require('request-promise');

const options = {  
  method: 'GET',
  uri: 'http://localhost:8080/api/customers/',
  json: true    
}
request(options)  
  .then(function (response) {
    // Request was successful, use the response object at will
    console.log(response); 
  })
  .catch(function (err) {
    // Something bad happened, handle the error
  })
