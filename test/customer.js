//HOW TO RUN: SET NODE_ENV=test then call node customer.js
var mongoose = require("mongoose"); 
var Customer = require("../model/customer");
var server = require("../server"); 
var request = require('request');
var expect  = require("chai").expect;
var constants = require("./constants"); 
describe('Customers', () => {

    before((done) => {
        Customer.remove({}, (err) => { 
            var newCustomer = new Customer(constants.DUMMY_CUSTOMER_WITH_FRIENDS);
            newCustomer.save(function(err){
                if (err) throw err; 
                else{
                    newCustomer = new Customer(constants.DUMMY_CUSTOMER_WITH_FRIENDS_1);
                    newCustomer.save(function(err1){
                        if (err1) throw err1; 
                        else{
                            newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER_TO_DELETE);
                            newCustomer.save(function(err2){
                                if (err2) throw err2; 
                                else
                                    done();     
                            }); 
                        }
                    });                      
                }
            });            
        });     
    });    

    describe("/POST Customers", () => {
        it('it should POST a correctly formatted Customer', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL, //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success"); 
                    expect(body.body).to.deep.equal(constants.DUMMY_CORRECT_CUSTOMER_RESPONSE); 
                }
            });
            var updatedCustomerURL = constants.CUSTOMERS_URL + "/" + constants.DUMMY_CORRECT_CUSTOMER._id; 
            request(updatedCustomerURL, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    var resBody = JSON.parse(body); 
                    expect(resBody._id).to.equal(constants.DUMMY_CORRECT_CUSTOMER._id); 
                    expect(resBody).to.have.all.keys("_id", "first_name", "last_name", "address", "friends");
                    expect(resBody.address).to.have.all.keys("street_number", "street_name", "city", "state", "zip"); 
                }
                done(); 
            });            
        }); 
        it('it should NOT POST an incorrectly formatted Customer', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL, //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                body: constants.DUMMY_INCORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error"); 
                }
                done(); 
            });
        });
        it('it should NOT POST a Customer with a unique _id that already exists', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL, //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                body: constants.DUMMY_INCORRECT_CUSTOMER_1,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error"); 
                }
                done(); 
            });
        });
        it('it should POST a friend to a Customer', (done) => {
            var options = {
                url: constants.CORRECT_CUSTOMER_SPEC_FRIEND_URL_1, //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");
                    expect(body.body.friends).to.include.members([constants.FRIEND2]); 
                    options = {
                        url: constants.CORRECT_CUSTOMER_SPEC_FRIEND_URL_2,
                        method: "POST", 
                        json: true
                    }; 
                    request(options, function(error1, response1, body1){
                        if (error1) throw error1; 
                        else{
                            expect(response1.statusCode).to.equal(200);
                            expect(body1).to.have.property("success"); 
                            expect(body1.body.friends).to.have.members([constants.FRIEND1]);
                            done(); 
                        }
                    }); 
                }
            });
        });
        it("it should NOT POST a friend to a Customer if that friend isn't a Customer", (done) => {
            var options = {
                url: constants.INCORRECT_CUSTOMER_SPEC_FRIEND_URL, //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error"); 
                }
                done(); 
            });
        });
        it("it should NOT POST a friend to a Customer if that Customer does not exist", (done) => {
            var options = {
                url: constants.INCORRECT_CUSTOMER_CORRECT_SPEC_FRIEND_URL, //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error"); 
                }
                done(); 
            });
        });        
        
    }); 
    describe("/GET Customers", () => {
        it('it should GET all the Customers', (done) => {
            request(constants.CUSTOMERS_URL, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    var resBody = JSON.parse(body); 
                    expect(resBody.length).to.equal(4); 
                }
                done(); 
            });
        }); 
        it('it should GET a specific Customer', (done) => {
            request(constants.SPEC_CUSTOMER_URL, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    var resBody = JSON.parse(body);
                    expect(resBody).to.deep.equal(constants.DUMMY_CORRECT_CUSTOMER_RESPONSE_WITH_FRIENDS); 
                }
                done(); 
            });
        });  
        it("it should GET a specific Customer's friends", (done) => {
            request(constants.SPEC_CUSTOMER_FRIENDS_URL, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    var resBody = JSON.parse(body);
                    expect(resBody).to.be.a("array");  
                }
                done(); 
            });
        });        
        it('it should NOT GET a specific Customer that does not exist', (done) => {
            request(constants.INCORRECT_SPEC_CUSTOMER_URL, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    var resBody = JSON.parse(body);
                    expect(resBody).to.have.property("error"); 
                }
                done(); 
            });
        }); 
        it('it should NOT GET friends of a specific Customer that does not exist', (done) => {
            request(constants.INCORRECT_SPEC_CUSTOMER_FRIENDS_URL, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    var resBody = JSON.parse(body);
                    expect(resBody).to.have.property("error"); 
                }
                done(); 
            });
        });         
    }); 
    describe("/PUT Customers", () => {
        it('it should UPDATE a Customer with given _id', (done) => {
            var options = {
                url: constants.SPEC_CUSTOMER_URL, //URL to hit
                method: 'PUT',
                //Lets post the following key/values as form
                body: constants.DUMMY_CORRECT_CUSTOMER_UPDATE,
                json: true
            }             
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body.body.address.zip).to.equal(constants.DUMMY_CORRECT_CUSTOMER_UPDATE.address.zip); 
                }
                done(); 
            });
        });  
        it('it should NOT UPDATE a Customer with given _id that does not exist', (done) => {
            var options = {
                url: constants.INCORRECT_SPEC_CUSTOMER_URL, //URL to hit
                method: 'PUT',
                //Lets post the following key/values as form
                body: constants.DUMMY_CORRECT_CUSTOMER_UPDATE,
                json: true
            }             
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error"); 
                }
                done(); 
            });
        }); 
        it('it should NOT UPDATE a Customer with incorrectly formatted customer', (done) => {
            var options = {
                url: constants.SPEC_CUSTOMER_URL, //URL to hit
                method: 'PUT',
                //Lets post the following key/values as form
                body: constants.DUMMY_INCORRECT_CUSTOMER_UPDATE,
                json: true
            }             
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error"); 
                }
                done(); 
            });
        });        
    }); 
    describe("/DELETE Customers", () => {
        it('it should DELETE a Customer', (done) => {
            var options = {
                url: constants.DELETE_CUSTOMER_URL, //URL to hit
                method: 'DELETE',
                //Lets post the following key/values as form
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success"); 
                    Customer.find({_id: constants.DUMMY_CORRECT_CUSTOMER_TO_DELETE._id}, function(err, customer){ 
                        var response; 
                        if (err) throw err; 
                        else{
                            expect(customer.length).to.equal(0); 
                            done(); 
                        }
                    });                     
                }
            });
        });        
    
    }); 
});