process.env.NODE_ENV = "test"; 
var mongoose = require("mongoose"); 
var customer = require("../model/customer");
var chai = require("chai"); 
var chaiHttp = require("chai-http"); 
var server = require("../server"); 
var should = chai.should(); 
var expect = chai.expect(); 
chai.use(chaiHttp); 

   
