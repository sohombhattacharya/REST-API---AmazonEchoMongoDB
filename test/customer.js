process.env.NODE_ENV = "test"; 
var mongoose = require("mongoose"); 
var customer = require("../model/customer");
var chai = require("chai"); 
var chaiHttp = require("chai-http"); 
var server = require("../server"); 
var should = chai.should(); 
chai.use(chaiHttp); 

describe("Customer", () => {
    
    beforeEach((done) => {
        Customer.remove({}, (err) => { 
           done();         
        });     
    });
    
    describe("/GET Customer", () => {
        it("it should GET all customers", (done) => {
            chai.request(server)
                .get("/api/customers")
                .end(function(err, res){
                    res.should.have.status(200); 
                    res.body.should.be.a("array"); 
                    res.body.length.should.be.eql(0);
            }); 
            done(); 
        });
    
    });
    describe("/POST Customer", () => {
        it("it should POST a customer", (done) => {
            chai.request(server)
                .post("/api/customers")
                .send(customer)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success");
            }); 
            done(); 
        });
    
    });    
});