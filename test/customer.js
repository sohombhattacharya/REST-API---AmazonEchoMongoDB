process.env.NODE_ENV = "test"; 
var mongoose = require("mongoose"); 
var customer = require("../model/customer");
var chai = require("chai"); 
var chaiHttp = require("chai-http"); 
var server = require("../server"); 
var should = chai.should(); 
var expect = chai.expect(); 
chai.use(chaiHttp); 

   
describe("Customer", () => {
    beforeEach((done) => {
        customer.remove({}, (err) => { 
           done();         
        });     
    });
  describe('/GET customer', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/customer')
            .end((err, res) => {
                res.should.have.status(4);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              
            });
          done();
      });
  });
});