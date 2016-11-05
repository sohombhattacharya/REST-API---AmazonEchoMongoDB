//HOW TO RUN: SET NODE_ENV=test then call node customer.js
var mongoose = require("mongoose"); 
var Customer = require("../model/customer");
var Account = require("../model/account");
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
    
    describe("/POST Accounts", () => {
        it("it should POST an account to a Customer if he/she does not already have an account", (done) => {
            var options = {
                url: constants.CUSTOMERS_URL + "/" + "111" + "/accounts", 
                method: 'POST',
                body: constants.DUMMY_CORRECT_ACCOUNT,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(response.statusCode).to.equal(200);
                    expect(body).to.have.property("success");
                    done(); 
                }
            });             
        });
        it("it should NOT POST an account to a Customer if he/she already has an account", (done) => {
            var options = {
                url: constants.CUSTOMERS_URL + "/" + "111" + "/accounts", 
                method: 'POST',
                body: constants.DUMMY_CORRECT_ACCOUNT,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    var options = {
                        url: constants.CUSTOMERS_URL + "/" + "111" + "/accounts", 
                        method: 'POST',
                        body: constants.DUMMY_CORRECT_ACCOUNT_1,
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
        it("it should NOT POST an incorrectly formatted account to a Customer", (done) => {
            var options = {
                url: constants.CUSTOMERS_URL + "/" + "111" + "/accounts", 
                method: 'POST',
                body: constants.DUMMY_INCORRECT_ACCOUNT,
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
            var specCustomerURL = constants.CUSTOMERS_URL + "/" + constants.DUMMY_CORRECT_ACCOUNT.customer_id + "/accounts";
            var options = {
                url: specCustomerURL, 
                method: 'POST',
                body: constants.DUMMY_CORRECT_ACCOUNT,
                json: true
            }            
            request(options, function(error, response, body) {
                if (error) throw error;  
                else{
                    expect(body).to.have.property("success");
                    request(specCustomerURL, function(error1, response1, body1) {
                        if (error1) throw error1;  
                        else{
                            expect(response1.statusCode).to.equal(200);
                            var resBody = JSON.parse(body1);
                            expect(resBody.customer_id).to.equal(body.body.customer_id); 
                            done(); 
                        }
                    });                    
                }
            }); 
        });         
    }); 
});