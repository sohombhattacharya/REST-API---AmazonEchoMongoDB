//HOW TO RUN: SET NODE_ENV=test then call node customer.js
var mongoose = require("mongoose"); 
var customer = require("../model/customer");
var server = require("../server"); 
var request = require('request');
var expect  = require("chai").expect;

describe('/GET Customers', () => {
    it('it should GET all the Customers', (done) => {
        request('http://localhost:8080/api/customers/', function(error, response, body) {
            expect(response.statusCode).to.equal(209);
            done(); 
        });
    });
});




//tests.Initialize();
//
//tests.CustomerCollectionShouldBeEmpty(); 
//tests.AddingCorrectCustomerShouldBeSuccess(); 
//tests.AddingIncorrectCustomerShouldFail; 
//tests.UpdatingCustomerShouldBeSuccess; 
//tests.UpdatingUnavailableCustomerShouldFail; 
//tests.UpdatingCustomerWithSameFieldsShouldBeSuccess; 
//tests.UpdatingCustomerWithIncorrectFieldsShouldFail; 
//tests.
