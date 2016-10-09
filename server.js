var express = require('express');        
var app = express();                 
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var CUSTOMERS_COLLECTION = "customers";
var port = process.env.PORT || 8080;        
var router = express.Router();              
var db; 
var Schema = mongoose.Schema; 
var ObjectID = mongoose.Schema.Types.ObjectId;
mongoose.Promise = global.Promise;
var mongodb_uri = "mongodb://test:test123@ds053136.mlab.com:53136/psu-capitalone"; // NEED TO USE HEROKU CONFIG FILES FOR USER/PASS
//var friendSchema = new Schema({
//    id: String, 
//    first_name: String, 
//    last_name: String
//});
var customerSchema = new Schema({
    _id: String,
    first_name: String,
    last_name: String,
    address: {
        street_number: String,
        street_name: String,
        city: String,
        state: String,
        zip: String
    },
    friends: []
}, { versionKey: false, collection: CUSTOMERS_COLLECTION});
//var Friend = mongoose.model("Friend", friendSchema); 
var Customer = mongoose.model("Customer", customerSchema); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(mongodb_uri, function(err, database){

    if (err){
        console.log(err);
        process.exit(1);
    }
    
    db = database; 
    console.log("Database connection successful"); 
    
    var server = app.listen(port, function(){
        app.use('/api', router);
        console.log("App is up"); 
    });
});

router.route("/").get(function(req, res) {
    res.json({ message: "capital one rest api" });   
});

router.route("/customers")

    .get(function(req, res){
        Customer.find({}, function(err, customers){
            if (err){
                var response = { error: "could not get all customers"};
                res.json(response);
            }
            else    
                res.json(customers);
        }); 
    })

    .post(function(req, res){
        var newCustomer = new Customer(req.body);
        newCustomer.save(function(err){
            if (err){
                var response = { error: "could not add new customer"};
                res.json(response); 
            }
            else{
                response = { success: "added customer"};    
                res.json(response); 
            }
        }); 
    });


router.route("/customers/:id")

    .get(function(req, res){
        Customer.find({_id: req.params.id}, function(err, customer){ 
            if (err){
                var response = { error: "could not get customer"};
                res.json(response);
            }
            else
                res.json(customer[0]);
        }); 
    })

    .put(function(req, res){

    //need to get new parameter names from user req.body
    
        Customer.findOneAndUpdate({_id: req.params.id}, newCustomer, function(err, user) {
            if (err){
                var response = { error: "could not edit customer"};
                res.json(response); 
            }
            else{
                response = { success: "edited customer"};    
                res.json(response); 
            }
        });    

    })

    .delete(function(req, res){
        Customer.findOneAndRemove({_id: req.params.id}, function(err) {
          if (err){
                var response = { error: "could not find and delete customer"};
                res.json(response);
            }
            else{
                response = { success: "found and deleted customer"};    
                res.json(response); 
            }
        });        
    });

router.route("/customers/:id/friends")
    
    .get(function(req, res){
        Customer.find({_id: req.params.id}, function(err, customer){
            if (err){
                var response = { error: "could not get all customers"};
                res.json(response);
            }
            else
                res.json(customer[0].friends);
        });     
    }); 

