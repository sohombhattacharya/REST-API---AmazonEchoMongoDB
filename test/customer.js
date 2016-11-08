//HOW TO RUN: SET NODE_ENV=test then call node customer.js
var mongoose = require("mongoose"); 
var Customer = require("../model/customer");
var Account = require("../model/account");
var Transfer = require("../model/transfer");
var server = require("../server"); 
var request = require('request');
var expect  = require("chai").expect;
var constants = require("./constants"); 
describe('Customers', () => {
    beforeEach((done) => {
        Customer.remove({}, (err) => { 
            if (err) throw err;
            else 
                done(); 
        });
    }); 
    after((done) => {
        Customer.remove({}, (err) => { 
            if (err) throw err;
            else 
                done(); 
        });
    });    
    describe("/POST Customers", () => {
        it('it should POST a correctly formatted Customer', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success"); 
                    expect(body.body).to.have.all.keys("_id", "first_name", "last_name", "address", "friends");
                    expect(body.body.address).to.have.all.keys("street_number", "street_name", "city", "state", "zip"); 
                    done(); 
                }
            });
        }); 
        it('it should NOT POST an incorrectly formatted Customer', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_INCORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error"); 
                    done(); 
                }
            });
        });
        it('it should POST a friend to a Customer', (done) => {
            var newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER);
            newCustomer.save(function(err, customer){
                if (err) throw err; 
                else{
                    newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER_1);
                    newCustomer.save(function(err1, customer1){
                        if (err1) throw err1; 
                        else{
                            var firstURL = constants.CUSTOMERS_URL + "/" + customer._id + "/friends/" + customer1._id;
                            var secondURL = constants.CUSTOMERS_URL + "/" + customer1._id + "/friends/" + customer._id;
                            var options = {
                                url: firstURL,
                                method: 'POST',
                                json: true
                            }            
                            request(options, function(error, response, body) {
                                if (error) throw error;  
                                else{
                                    expect(response.statusCode).to.equal(200);
                                    expect(body).to.have.property("success");
                                    expect(body.body.friends).to.include.members([String(customer1._id)]); 
                                    options = {
                                        url: secondURL,
                                        method: "POST", 
                                        json: true
                                    }; 
                                    request(options, function(error1, response1, body1){
                                        if (error1) throw error1; 
                                        else{
                                            expect(response1.statusCode).to.equal(200);
                                            expect(body1).to.have.property("success"); 
                                            expect(body1.body.friends).to.have.members([String(customer._id)]);
                                            done(); 
                                        }
                                    }); 
                                }
                            });                        
                        }
                    });
                }
            });            
        });
        it("it should NOT POST a friend to a Customer if that friend isn't a Customer", (done) => {
            var newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER);
            newCustomer.save(function(err, customer){
                if (err) throw err; 
                else{
                    newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER_1);
                    newCustomer.save(function(err1, customer1){
                        if (err1) throw err1; 
                        else{
                            var firstURL = constants.CUSTOMERS_URL + "/" + customer._id + "/friends/" + "00000000";
                            var secondURL = constants.CUSTOMERS_URL + "/" + customer1._id + "/friends/" + "09090909";
                            var options = {
                                url: firstURL,
                                method: 'POST',
                                json: true
                            }            
                            request(options, function(error, response, body) {
                                if (error) throw error;  
                                else{
                                    expect(response.statusCode).to.equal(200);
                                    expect(body).to.have.property("error");
                                    options = {
                                        url: secondURL,
                                        method: "POST", 
                                        json: true
                                    }; 
                                    request(options, function(error1, response1, body1){
                                        if (error1) throw error1; 
                                        else{
                                            expect(response1.statusCode).to.equal(200);
                                            expect(body1).to.have.property("error"); 
                                            done(); 
                                        }
                                    }); 
                                }
                            });                        
                        }
                    });
                }
            });
        });
        it("it should NOT POST a friend to a Customer if that Customer does not exist", (done) => {
            var newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER);
            newCustomer.save(function(err, customer){
                if (err) throw err; 
                else{
                    newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER_1);
                    newCustomer.save(function(err1, customer1){
                        if (err1) throw err1; 
                        else{
                            var firstURL = constants.CUSTOMERS_URL + "/" + "000000" + "/friends/" + customer1._id;
                            var secondURL = constants.CUSTOMERS_URL + "/" + "09090909" + "/friends/" + customer._id;
                            var options = {
                                url: firstURL,
                                method: 'POST',
                                json: true
                            }            
                            request(options, function(error, response, body) {
                                if (error) throw error;  
                                else{
                                    expect(response.statusCode).to.equal(200);
                                    expect(body).to.have.property("error");
                                    options = {
                                        url: secondURL,
                                        method: "POST", 
                                        json: true
                                    }; 
                                    request(options, function(error1, response1, body1){
                                        if (error1) throw error1; 
                                        else{
                                            expect(response1.statusCode).to.equal(200);
                                            expect(body1).to.have.property("error"); 
                                            done(); 
                                        }
                                    }); 
                                }
                            });                        
                        }
                    });
                }
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
                    expect(resBody.length).to.equal(0); 
                    done(); 
                }
            });
        }); 
        it('it should GET a specific Customer', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL, 
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    var specCustomerURL = constants.CUSTOMERS_URL + "/" + body.body._id;
                    request(specCustomerURL, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            var resBody = JSON.parse(body1);
                            expect(resBody._id).to.equal(body.body._id); 
                            done(); 
                        }
                    });                    
                }
            }); 
        });  
        it("it should GET a specific Customer's friends", (done) => {
            var options = {
                url: constants.CUSTOMERS_URL, 
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    var specCustomerURL = constants.CUSTOMERS_URL + "/" + body.body._id + "/friends";
                    request(specCustomerURL, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            var resBody = JSON.parse(body1);
                            expect(resBody).to.be.a("array"); 
                            done(); 
                        }
                    });                    
                }
            });  
        });        
        it('it should NOT GET a specific Customer that does not exist', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL, 
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    var specCustomerURL = constants.CUSTOMERS_URL + "/" + "000000";
                    request(specCustomerURL, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            var resBody = JSON.parse(body1);
                            expect(resBody).to.have.property("error"); 
                            done(); 
                        }
                    });                    
                }
            });
        }); 
        it('it should NOT GET friends of a specific Customer that does not exist', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL, 
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    var specCustomerURL = constants.CUSTOMERS_URL + "/" + "00000000" + "/friends";
                    request(specCustomerURL, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            var resBody = JSON.parse(body1);
                            expect(resBody).to.have.property("error"); 
                            done(); 
                        }
                    });                    
                }
            });
        });         
    }); 
    describe("/PUT Customers", () => {
        it('it should UPDATE a Customer with given _id', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL, 
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    var specCustomerURL = constants.CUSTOMERS_URL + "/" + body.body._id;
                    var options = {
                        url: specCustomerURL, 
                        method: 'PUT',
                        body: constants.DUMMY_CORRECT_CUSTOMER_UPDATE,
                        json: true
                    }             
                    request(options, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            expect(body1).to.have.property("success");
                            expect(body1.body.last_name).to.equal(constants.DUMMY_CORRECT_CUSTOMER_UPDATE.last_name); 
                            expect(body1.body.address.zip).to.equal(constants.DUMMY_CORRECT_CUSTOMER_UPDATE.address.zip);
                            expect(body1.body.address.street_number).to.equal(constants.DUMMY_CORRECT_CUSTOMER_UPDATE.address.street_number);
                            done(); 
                        }
                    });                   
                }
            });   
        });  
        it('it should NOT UPDATE a Customer with given _id that does not exist', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL, 
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    var specCustomerURL = constants.CUSTOMERS_URL + "/" + "000000";
                    var options = {
                        url: specCustomerURL, 
                        method: 'PUT',
                        body: constants.DUMMY_CORRECT_CUSTOMER_UPDATE,
                        json: true
                    }             
                    request(options, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            expect(body1).to.have.property("error");
                            done(); 
                        }
                    });                   
                }
            }); 
        }); 
        it('it should NOT UPDATE a Customer with incorrectly formatted customer', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    var specCustomerURL = constants.CUSTOMERS_URL + "/" + body.body._id;
                    var options = {
                        url: specCustomerURL, 
                        method: 'PUT',
                        body: constants.DUMMY_INCORRECT_CUSTOMER,
                        json: true
                    }             
                    request(options, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            expect(body1).to.have.property("error");
                            done(); 
                        }
                    });                   
                }
            });
        });        
    }); 
    describe("/DELETE Customers", () => {
        it('it should DELETE a Customer', (done) => {
            var newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER);
            newCustomer.save(function(err, customer){
                if (err) throw err; 
                else{
                    newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER_1);
                    newCustomer.save(function(err1, customer1){
                        if (err1) throw err1; 
                        else{
                            var firstURL = constants.CUSTOMERS_URL + "/" + customer._id + "/friends/" + customer1._id;
                            var secondURL = constants.CUSTOMERS_URL + "/" + customer1._id + "/friends/" + customer._id;
                            var options = {
                                url: firstURL,
                                method: 'POST',
                                json: true
                            }            
                            request(options, function(error, response, body) {
                                if (error) throw error;  
                                else{
                                    expect(response.statusCode).to.equal(200);
                                    expect(body).to.have.property("success");
                                    expect(body.body.friends).to.include.members([String(customer1._id)]); 
                                    options = {
                                        url: secondURL,
                                        method: "POST", 
                                        json: true
                                    }; 
                                    request(options, function(error1, response1, body1){
                                        if (error1) throw error1; 
                                        else{
                                            expect(response1.statusCode).to.equal(200);
                                            expect(body1).to.have.property("success"); 
                                            expect(body1.body.friends).to.have.members([String(customer._id)]);
                                            var options = {
                                                url: constants.CUSTOMERS_URL + "/" + customer._id,
                                                method: 'DELETE',
                                                json: true
                                            }            
                                            request(options, function(error2, response2, body2) {
                                                if (error2) throw error2;  
                                                else{
                                                    expect(response2.statusCode).to.equal(200);
                                                    expect(body2).to.have.property("success"); 
                                                    Customer.find({_id: customer._id}, function(err2, customer2){ 
                                                        var response; 
                                                        if (err2) throw err2; 
                                                        else{
                                                            expect(customer2.length).to.equal(0); 
                                                            Customer.find({}, function(err3, customers3){
                                                                if (err3) throw err3; 
                                                                else{    
                                                                    var i; 
                                                                    for (i = 0; i < customers3.length; i++)
                                                                    expect(customers3[i].friends).to.not.have.members([String(customer._id)]);
                                                                    done(); 
                                                                }
                                                            });                               
                                                        }
                                                    });                     
                                                }
                                            });                                            
                                        }
                                    }); 
                                }
                            });                        
                        }
                    });
                }
            });  
        });
        it('it should NOT DELETE a Customer that does not exist', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL + "/" + "0000000",
                method: 'DELETE',
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error"); 
                    done(); 
                }
            });
        }); 
        it('it should DELETE a friend of a Customer', (done) => {
            var newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER);
            newCustomer.save(function(err, customer){
                if (err) throw err; 
                else{
                    newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER_1);
                    newCustomer.save(function(err1, customer1){
                        if (err1) throw err1; 
                        else{
                            var firstURL = constants.CUSTOMERS_URL + "/" + customer._id + "/friends/" + customer1._id;
                            var secondURL = constants.CUSTOMERS_URL + "/" + customer1._id + "/friends/" + customer._id;
                            var options = {
                                url: firstURL,
                                method: 'POST',
                                json: true
                            }            
                            request(options, function(error, response, body) {
                                if (error) throw error;  
                                else{
                                    expect(response.statusCode).to.equal(200);
                                    expect(body).to.have.property("success");
                                    expect(body.body.friends).to.include.members([String(customer1._id)]); 
                                    options = {
                                        url: secondURL,
                                        method: "POST", 
                                        json: true
                                    }; 
                                    request(options, function(error1, response1, body1){
                                        if (error1) throw error1; 
                                        else{
                                            expect(response1.statusCode).to.equal(200);
                                            expect(body1).to.have.property("success"); 
                                            expect(body1.body.friends).to.have.members([String(customer._id)]);
                                            options = {
                                                url: firstURL,
                                                method: 'DELETE',
                                                json: true
                                            }            
                                            request(options, function(error2, response2, body2) {
                                                if (error2) throw error2;  
                                                else{
                                                    expect(response2.statusCode).to.equal(200);
                                                    expect(body2.body.friends).to.not.have.members([String(customer1._id)]); 
                                                    expect(body2).to.have.property("success"); 
                                                    done(); 
                                                }
                                            });                                            
                                        }
                                    }); 
                                }
                            });                        
                        }
                    });
                }
            });   
        });  
        it('it should NOT DELETE a friend of a Customer if it is not a friend', (done) => {
            var newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER);
            newCustomer.save(function(err, customer){
                if (err) throw err; 
                else{
                    newCustomer = new Customer(constants.DUMMY_CORRECT_CUSTOMER_1);
                    newCustomer.save(function(err1, customer1){
                        if (err1) throw err1; 
                        else{
                            var firstURL = constants.CUSTOMERS_URL + "/" + customer._id + "/friends/" + customer1._id;
                            var secondURL = constants.CUSTOMERS_URL + "/" + customer1._id + "/friends/" + customer._id;
                            var options = {
                                url: firstURL,
                                method: 'POST',
                                json: true
                            }            
                            request(options, function(error, response, body) {
                                if (error) throw error;  
                                else{
                                    expect(response.statusCode).to.equal(200);
                                    expect(body).to.have.property("success");
                                    expect(body.body.friends).to.include.members([String(customer1._id)]); 
                                    options = {
                                        url: secondURL,
                                        method: "POST", 
                                        json: true
                                    }; 
                                    request(options, function(error1, response1, body1){
                                        if (error1) throw error1; 
                                        else{
                                            expect(response1.statusCode).to.equal(200);
                                            expect(body1).to.have.property("success"); 
                                            expect(body1.body.friends).to.have.members([String(customer._id)]);
                                            var thirdURL = constants.CUSTOMERS_URL + "/" + customer._id + "/friends/" + "00000";
                                            options = {
                                                url: thirdURL,
                                                method: 'DELETE',
                                                json: true
                                            }            
                                            request(options, function(error2, response2, body2) {
                                                if (error2) throw error2;  
                                                else{
                                                    expect(response2.statusCode).to.equal(200);
                                                    expect(body2).to.have.property("error"); 
                                                    done(); 
                                                }
                                            });                                            
                                        }
                                    }); 
                                }
                            });                        
                        }
                    });
                }
            });             
        });         
    }); 
});
describe("Accounts", () => {
    beforeEach((done) => {
        Account.remove({}, (err) => { 
            if (err) throw err;
            else 
                done(); 
        });
    }); 
    after((done) => {
        Customer.remove({}, (err) => { 
            if (err) throw err;
            else{
                Account.remove({}, (err1) => { 
                    if (err1) throw err1;
                    else 
                        done(); 
                });            
            }
        });
    });     
    describe("/POST Accounts", () => {
        it("it should POST an account to a Customer if he/she does not already have an account", (done) => {
            var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success"); 
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            expect(body1).to.have.property("success");
                            done(); 
                        }
                    });                    
                }
            });                         
        });
        it("it should NOT POST an account to a Customer if balance < 0", (done) => {
            var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success"); 
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_INCORRECT_ACCOUNT_2,
                        json: true
                    }            
                    request(options, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            expect(body1).to.have.property("error");
                            done(); 
                        }
                    });                    
                }
            });                         
        });        
        it("it should NOT POST an account to a Customer if he/she already has an account", (done) => {
            var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success"); 
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            var options = {
                                url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                                method: 'POST',
                                body: constants.DUMMY_CORRECT_ACCOUNT_1,
                                json: true
                            }            
                            request(options, function(error2, response2, body2) {
                                if (error2) throw error2;  
                                else{
                                    expect(response2.statusCode).to.equal(200);
                                    expect(body2).to.have.property("error");
                                    done(); 
                                }
                            });  
                        }
                    });                 
                }
            });                   
        }); 
        it("it should NOT POST an account to a Customer that does not exist", (done) => {
            var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");  
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            var options = {
                                url: constants.CUSTOMERS_URL + "/" + "101" + "/account", 
                                method: 'POST',
                                body: constants.DUMMY_CORRECT_ACCOUNT_1,
                                json: true
                            }            
                            request(options, function(error2, response2, body2) {
                                if (error2) throw error2;  
                                else{
                                    expect(response2.statusCode).to.equal(200);
                                    expect(body2).to.have.property("error");
                                    done(); 
                                }
                            });  
                        }
                    });
                }
            });                    
        });        
        it("it should NOT POST an incorrectly formatted account to a Customer", (done) => {
            var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success"); 
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_INCORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            expect(body1).to.have.property("error");
                            done(); 
                        }
                    });                 
                }
            });                        
        });        
    });
    describe("/GET Accounts", () => {
        it('it should GET all the Accounts', (done) => {
            request(constants.ACCOUNTS_URL, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    var resBody = JSON.parse(body); 
                    expect(resBody.length).to.equal(0); 
                    done(); 
                }
            });
        }); 
        it('it should GET Accounts for a specific Customer', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success"); 
                    var specCustomerURL = constants.CUSTOMERS_URL + "/" + body.body._id + "/account";
                    var options = {
                        url: specCustomerURL, 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error2, response2, body2) {
                        if (error2) throw error2;  
                        else{
                            expect(body2).to.have.property("success");
                            request(specCustomerURL, function(error1, response1, body1) {
                                if (error1) throw error1;  
                                else{
                                    expect(response1.statusCode).to.equal(200);
                                    var resBody = JSON.parse(body1);
                                    expect(resBody.customer_id).to.equal(body2.body.customer_id); 
                                    done(); 
                                }
                            });                    
                        }
                    });                
                }
            });             
        });    
        it('it should GET Account for a specific account id', (done) => {
            var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");             
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error2, response2, body2) {
                        if (error2) throw error2;  
                        else{
                            expect(body2).to.have.property("success");
                            var specAccountURL = constants.ACCOUNTS_URL + "/" + body2.body._id;
                            request(specAccountURL, function(error1, response1, body1) {
                                if (error1) throw error1;  
                                else{
                                    expect(response1.statusCode).to.equal(200);
                                    var resBody = JSON.parse(body1);
                                    expect(resBody.type).to.equal(constants.DUMMY_CORRECT_ACCOUNT.type);
                                    expect(resBody.nickname).to.equal(constants.DUMMY_CORRECT_ACCOUNT.nickname);
                                    expect(resBody.rewards).to.equal(constants.DUMMY_CORRECT_ACCOUNT.rewards);
                                    expect(resBody.balance).to.equal(constants.DUMMY_CORRECT_ACCOUNT.balance);
                                    expect(resBody.account_number).to.equal(constants.DUMMY_CORRECT_ACCOUNT.account_number);
                                    expect(resBody._id).to.equal(body2.body._id);
                                    done(); 
                                }
                            });                    
                        }
                    }); 
                }
            });   
        });   
        it('it should NOT GET Account for a specific account id that does not exist', (done) => {
           var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");               
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error2, response2, body2) {
                        if (error2) throw error2;  
                        else{
                            expect(body2).to.have.property("success");
                            var specAccountURL = constants.ACCOUNTS_URL + "/" + "00000";
                            request(specAccountURL, function(error1, response1, body1) {
                                if (error1) throw error1;  
                                else{
                                    expect(response1.statusCode).to.equal(200);
                                    var resBody = JSON.parse(body1);
                                    expect(resBody).to.have.property("error");
                                    done(); 
                                }
                            });                    
                        }
                    }); 
                }
            });       
        });        
        it("it should NOT GET Account for a specific Customer if the customer doesn't exist", (done) => {
           var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");                 
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error2, response2, body2) {
                        if (error2) throw error2;  
                        else{
                            expect(body2).to.have.property("success");
                            var specCustomerURL = constants.CUSTOMERS_URL + "/" + "222" + "/account";
                            request(specCustomerURL, function(error1, response1, body1) {
                                if (error1) throw error1;  
                                else{
                                    expect(response1.statusCode).to.equal(200);
                                    var resBody = JSON.parse(body1);
                                    expect(resBody).to.have.property("error"); 
                                    done(); 
                                }
                            });                    
                        }
                    }); 
                }
            });     
        }); 
    });
    describe("/PUT Accounts", () => {
        it('it should UPDATE an Account', (done) => {
           var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");             
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error2, response2, body2) {
                        if (error2) throw error2;  
                        else{
                            var updatedCorrectAccount = constants.DUMMY_CORRECT_ACCOUNT_1;
                            updatedCorrectAccount.customer_id = body.body._id;
                            var options = {
                                url: constants.ACCOUNTS_URL + "/" + body2.body._id, 
                                method: 'PUT',
                                body: updatedCorrectAccount,
                                json: true
                            }             
                            request(options, function(error1, response1, body1) {
                                if (error1) throw error1;  
                                else{
                                    expect(response1.statusCode).to.equal(200);
                                    expect(body1.body.type).to.equal(constants.DUMMY_CORRECT_ACCOUNT_1.type); 
                                    done(); 
                                }
                            });                   
                        }
                    });  
                }
            });
        });
        it('it should NOT UPDATE an Account with balance < 0', (done) => {
           var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");             
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error2, response2, body2) {
                        if (error2) throw error2;  
                        else{
                            constants.DUMMY_INCORRECT_ACCOUNT_2.customer_id = body.body._id;
                            var options = {
                                url: constants.ACCOUNTS_URL + "/" + body2.body._id, 
                                method: 'PUT',
                                body: constants.DUMMY_INCORRECT_ACCOUNT_2,
                                json: true
                            }             
                            request(options, function(error1, response1, body1) {
                                if (error1) throw error1;  
                                else{
                                    expect(response1.statusCode).to.equal(200);
                                    expect(body1).to.have.property("error"); 
                                    done(); 
                                }
                            });                   
                        }
                    });  
                }
            });
        });        
        it("it should NOT UPDATE an Account if it doesn't exist", (done) => {
           var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");             
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error2, response2, body2) {
                        if (error2) throw error2;  
                        else{
                            var updatedCorrectAccount = constants.DUMMY_CORRECT_ACCOUNT_1;
                            updatedCorrectAccount.customer_id = body.body._id;
                            var options = {
                                url: constants.ACCOUNTS_URL + "/" + "1111111", 
                                method: 'PUT',
                                body: updatedCorrectAccount,
                                json: true
                            }             
                            request(options, function(error1, response1, body1) {
                                if (error1) throw error1;  
                                else{
                                    expect(response1.statusCode).to.equal(200);
                                    expect(body1).to.have.property("error");
                                    done(); 
                                }
                            });                   
                        }
                    });  
                }
            });
        });        
        it('it should NOT UPDATE an account with incorrectly formatted account body', (done) => {
           var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");              
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error2, response2, body2) {
                        if (error2) throw error2;  
                        else{
                            var options = {
                                url: constants.ACCOUNTS_URL + "/" + body2.body._id, 
                                method: 'PUT',
                                body: constants.DUMMY_INCORRECT_ACCOUNT,
                                json: true
                            }             
                            request(options, function(error1, response1, body1) {
                                if (error1) throw error1;  
                                else{
                                    expect(response1.statusCode).to.equal(200);
                                    expect(body1).to.have.property("error");  
                                    done(); 
                                }
                            });                   
                        }
                    });   
                }
            });
        });       
    });
    describe("/DELETE Accounts", () => {
        it('it should DELETE an Account', (done) => {
           var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");                
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error2, response2, body2) {
                        if (error2) throw error2;  
                        else{
                            expect(response2.statusCode).to.equal(200);
                            expect(body2).to.have.property("success");
                            var options = {
                                url: constants.ACCOUNTS_URL + "/" + body2._id,
                                method: 'DELETE',
                                json: true
                            }            
                            request(options, function(error1, response1, body1) {
                                if (error1) throw error1;  
                                else{
                                    specCustomerURL = constants.ACCOUNTS_URL + "/" + body2._id;
                                    request(specCustomerURL, function(error1, response1, body1) {
                                        if (error1) throw error1;  
                                        else{
                                            expect(response1.statusCode).to.equal(200);
                                            var resBody = JSON.parse(body1);
                                            expect(resBody).to.have.property("error"); 
                                            done(); 
                                        }
                                    });                             
                                }
                            });                    
                        }
                    });
                }
            });
        });    
        it('it should NOT DELETE an Account if it does not exist', (done) => {
           var options = {
                url: constants.CUSTOMERS_URL,
                method: 'POST',
                body: constants.DUMMY_CORRECT_CUSTOMER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");             
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + body.body._id + "/account", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT,
                        json: true
                    }            
                    request(options, function(error2, response2, body2) {
                        if (error2) throw error2;  
                        else{
                            expect(response2.statusCode).to.equal(200);
                            expect(body2).to.have.property("success");
                            var options = {
                                url: constants.ACCOUNTS_URL + "/" + "1111111",
                                method: 'DELETE',
                                json: true
                            }            
                            request(options, function(error1, response1, body1) {
                                if (error1) throw error1;  
                                else{
                                    expect(response1.statusCode).to.equal(200);
                                    expect(body1).to.have.property("error");
                                    done();
                                }
                            });                    
                        }
                    });
                }
            });
        });        
    });     
});
describe("Transfers", () => {
    CUSTOMER1_id = "";
    CUSTOMER2_id = "";
    CUSTOMER1_ACCOUNT_id = "";
    CUSTOMER2_ACCOUNT_id = ""; 
    CUSTOMER1_ACCOUNT_TRANSFER_id = "";
    before((done) => {
        Transfer.remove({}, (err) => { 
            if (err) throw err;
            else{
                var options = {
                    url: constants.CUSTOMERS_URL,
                    method: 'POST',
                    body: constants.DUMMY_CORRECT_CUSTOMER,
                    json: true
                }            
                request(options, function(error, response, body) {
                    if (error) throw error;  
                    else{
                        expect(response.statusCode).to.equal(200);
                        expect(body).to.have.property("success");
                        CUSTOMER1_id = body.body._id;
                        options = {
                            url: constants.CUSTOMERS_URL,
                            method: 'POST',
                            body: constants.DUMMY_CORRECT_CUSTOMER_1,
                            json: true
                        }            
                        request(options, function(error1, response1, body1) {
                            if (error1) throw error1;  
                            else{
                                expect(response1.statusCode).to.equal(200);
                                expect(body1).to.have.property("success");
                                CUSTOMER2_id = body1.body._id; 
                                options = {
                                    url: constants.CUSTOMERS_URL + "/" + CUSTOMER1_id + "/account", 
                                    method: 'POST',
                                    body: constants.DUMMY_CORRECT_ACCOUNT,
                                    json: true
                                }            
                                request(options, function(error2, response2, body2) {
                                    if (error2) throw error2;  
                                    else{
                                        expect(response2.statusCode).to.equal(200);
                                        expect(body2).to.have.property("success");
                                        CUSTOMER1_ACCOUNT_id = body2.body._id;
                                        options = {
                                            url: constants.CUSTOMERS_URL + "/" + CUSTOMER2_id + "/account", 
                                            method: 'POST',
                                            body: constants.DUMMY_CORRECT_ACCOUNT_1,
                                            json: true
                                        }            
                                        request(options, function(error3, response3, body3) {
                                            if (error3) throw error3;  
                                            else{
                                                expect(response3.statusCode).to.equal(200);
                                                expect(body3).to.have.property("success");
                                                CUSTOMER2_ACCOUNT_id = body3.body._id;
                                                done();
                                            }
                                        });                                        
                                    }
                                });
                            }
                        });                        
                    }
                });
            } 
        });
    }); 
    after((done) => {
        Customer.remove({}, (err) => { 
            if (err) throw err;
            else{
                Account.remove({}, (err1) => { 
                    if (err1) throw err1;
                    else{
                        Transfer.remove({}, (err2) => {
                            if (err2) throw err2; 
                            else
                                done();
                        });
                    }
                });            
            }
        });
    });    
    describe("/POST Transfers", () => {
        it("it should POST a Transfer from an Account if amount < balance", (done) => {
            var newTransfer = constants.DUMMY_CORRECT_TRANSFER;
            newTransfer.sender = CUSTOMER1_ACCOUNT_id; 
            newTransfer.receiver = CUSTOMER2_ACCOUNT_id; 
            var options = {
                url: constants.ACCOUNTS_URL + "/" + newTransfer.sender + "/transfers",
                method: 'POST',
                body: newTransfer,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success"); 
                    CUSTOMER1_ACCOUNT_TRANSFER_id = body.body._id;
                    done();
                } 
            });
        });
        it("it should NOT POST a Transfer from an Account if amount > balance", (done) => {
            var newTransfer = constants.DUMMY_CORRECT_TRANSFER_1;
            newTransfer.sender = CUSTOMER1_ACCOUNT_id; 
            newTransfer.receiver = CUSTOMER2_ACCOUNT_id; 
            var options = {
                url: constants.ACCOUNTS_URL + "/" + newTransfer.sender + "/transfers",
                method: 'POST',
                body: newTransfer,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error"); 
                    done();
                } 
            });
        });          
        it("it should NOT POST a Transfer from an Account that does not exist", (done) => {
            var newTransfer = constants.DUMMY_CORRECT_TRANSFER;
            newTransfer.sender = "111"; 
            newTransfer.receiver = CUSTOMER2_ACCOUNT_id; 
            var options = {
                url: constants.ACCOUNTS_URL + "/" + newTransfer.sender + "/transfers",
                method: 'POST',
                body: constants.DUMMY_CORRECT_TRANSFER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error");  
                    done();
                } 
            });
        });   
        it("it should NOT POST a Transfer to an Account that does not exist", (done) => {
            var newTransfer = constants.DUMMY_CORRECT_TRANSFER;
            newTransfer.sender = CUSTOMER1_ACCOUNT_id; 
            newTransfer.receiver = "111"; 
            var options = {
                url: constants.ACCOUNTS_URL + "/" + CUSTOMER1_ACCOUNT_id + "/transfers",
                method: 'POST',
                body: constants.DUMMY_CORRECT_TRANSFER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error");  
                    done();
                } 
            });
        });         
        it("it should NOT POST a Transfer to an Account with an incorrectly formatted transfer", (done) => {
            var newTransfer = constants.DUMMY_CORRECT_TRANSFER;
            newTransfer.sender = CUSTOMER1_ACCOUNT_id; 
            newTransfer.receiver = CUSTOMER2_ACCOUNT_id; 
            var options = {
                url: constants.ACCOUNTS_URL + "/" + CUSTOMER1_ACCOUNT_id + "/transfers",
                method: 'POST',
                body: constants.DUMMY_INCORRECT_TRANSFER,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error");  
                    done();
                } 
            });
        });         
    });
    describe("/GET Transfers", () => {
        it("it should GET Transfers for an Account", (done) => {
            var options = {
                url: constants.ACCOUNTS_URL + "/" + CUSTOMER1_ACCOUNT_id + "/transfers",
                method: 'GET',
                json: true
            }            
            request(options, function(error1, response1, body1) {
                if (error1) throw error1;  
                else{
                    expect(response1.statusCode).to.equal(200);
                    expect(body1.length).to.equal(1);
                    done();
                }
            });    
        });     
        it("it should GET all Transfers", (done) => {
            var options = {
                url: constants.TRANSFERS_URL,
                method: 'GET',
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body.length).to.equal(1);  
                    done();
                } 
            });
        });
        it("it should GET specific Transfer based on id", (done) => {
            var options = {
                url: constants.TRANSFERS_URL + "/" + CUSTOMER1_ACCOUNT_TRANSFER_id,
                method: 'GET',
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body._id).to.equal(CUSTOMER1_ACCOUNT_TRANSFER_id);  
                    done();
                } 
            });
        });  
        it("it should NOT GET specific Transfer if the transfer id does not exist", (done) => {
            var options = {
                url: constants.TRANSFERS_URL + "/" + "111",
                method: 'GET',
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error");  
                    done();
                } 
            });
        });  
        it("it should NOT GET Transfers for an Account that does not exist", (done) => {
            var options = {
                url: constants.ACCOUNTS_URL + "/" + "111" + "/transfers",
                method: 'GET',
                json: true
            }            
            request(options, function(error1, response1, body1) {
                if (error1) throw error1;  
                else{
                    expect(response1.statusCode).to.equal(200);
                    expect(body1).to.have.property("error");
                    done();
                }
            });        
        });           
    }); 
    describe("/PUT Transfers", () => {
        it("it should UPDATE a Transfer", (done) => {
            var updatedTransfer = constants.DUMMY_CORRECT_TRANSFER_1;
            updatedTransfer.sender = CUSTOMER1_ACCOUNT_id; 
            updatedTransfer.receiver = CUSTOMER2_ACCOUNT_id; 
            var options = {
                url: constants.TRANSFERS_URL + "/" + CUSTOMER1_ACCOUNT_TRANSFER_id,
                method: 'PUT',
                body: updatedTransfer,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");
                    expect(body.body.amount).to.equal(updatedTransfer.amount);
                    expect(body.body.description).to.equal(updatedTransfer.description);
                    done();
                } 
            });
        });  
        it("it should NOT UPDATE a Transfer if it does not exist", (done) => {
            var updatedTransfer = constants.DUMMY_CORRECT_TRANSFER_1;
            updatedTransfer.sender = CUSTOMER1_ACCOUNT_id; 
            updatedTransfer.receiver = CUSTOMER2_ACCOUNT_id; 
            var options = {
                url: constants.TRANSFERS_URL + "/" + "111",
                method: 'PUT',
                body: updatedTransfer,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error");
                    done();
                } 
            });
        });
        it("it should NOT UPDATE a Transfer with an incorrectly formatted transfer", (done) => {
            var updatedTransfer = constants.DUMMY_INCORRECT_TRANSFER;
            updatedTransfer.sender = CUSTOMER1_ACCOUNT_id; 
            updatedTransfer.receiver = CUSTOMER2_ACCOUNT_id; 
            var options = {
                url: constants.TRANSFERS_URL + "/" + CUSTOMER1_ACCOUNT_TRANSFER_id,
                method: 'PUT',
                body: updatedTransfer,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error");
                    done();
                } 
            });
        });        
    });
    describe("/DELETE Transfers", () => {
        it("it should DELETE a specific Transfer based on id", (done) => {
            var options = {
                url: constants.TRANSFERS_URL + "/" + CUSTOMER1_ACCOUNT_TRANSFER_id,
                method: 'DELETE',
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success"); 
                    options = {
                        url: constants.TRANSFERS_URL + "/" + CUSTOMER1_ACCOUNT_TRANSFER_id,
                        method: 'GET',
                        json: true
                    }            
                    request(options, function(error, response, body) {
                        if (error) throw error;  
                        else{
                            expect(response.statusCode).to.equal(200);
                            expect(body).to.have.property("error");  
                            done();
                        } 
                    });                    
                } 
            });
        });
        it("it should NOT DELETE a specific Transfer if the id does not exist", (done) => {
            var options = {
                url: constants.TRANSFERS_URL + "/" + "111",
                method: 'GET',
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("error");  
                    done();
                } 
            });
        });          
    }); 
});
