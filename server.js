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
    friends: [{id: String, first_name: String, last_name: String}]
}, { versionKey: false, collection: CUSTOMERS_COLLECTION});
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

router.route("/customers/:id/firstName/:new")
    .put(function(req, res){
        var newEdit = { first_name: req.params.new }
        Customer.findOneAndUpdate({_id: req.params.id}, newEdit, function(err, user) {
            if (err){
                var response = { error: "could not edit first name"};
                res.json(response); 
            }
            else{
                response = { success: "edited first name"};    
                res.json(response); 
            }
        });    
    });

router.route("/customers/:id/lastName/:new")
    .put(function(req, res){
        var newEdit = { last_name: req.params.new }
        Customer.findOneAndUpdate({_id: req.params.id}, newEdit, function(err, user) {
            if (err){
                var response = { error: "could not edit last name"};
                res.json(response); 
            }
            else{
                response = { success: "edited last name"};    
                res.json(response); 
            }
        });    
    });
router.route("/customers/:id/address/streetNumber/:new")
    .put(function(req, res){
        var newEdit = { "address.street_number": req.params.new }
        Customer.findOneAndUpdate({_id: req.params.id}, newEdit, function(err, user) {
            if (err){
                var response = { error: "could not edit street number"};
                res.json(response); 
            }
            else{
                response = { success: "edited street number"};    
                res.json(response); 
            }
        });    
    });
router.route("/customers/:id/address/streetName/:new")
    .put(function(req, res){
        var newEdit = { "address.street_name": req.params.new }
        Customer.findOneAndUpdate({_id: req.params.id}, newEdit, function(err, user) {
            if (err){
                var response = { error: "could not edit street name"};
                res.json(response); 
            }
            else{
                response = { success: "edited street name"};    
                res.json(response); 
            }
        });    
    });
router.route("/customers/:id/address/city/:new")
    .put(function(req, res){
        var newEdit = { "address.city": req.params.new }
        Customer.findOneAndUpdate({_id: req.params.id}, newEdit, function(err, user) {
            if (err){
                var response = { error: "could not edit city"};
                res.json(response); 
            }
            else{
                response = { success: "edited city"};    
                res.json(response); 
            }
        });    
    });
router.route("/customers/:id/address/state/:new")
    .put(function(req, res){
        var newEdit = { "address.state": req.params.new }
        Customer.findOneAndUpdate({_id: req.params.id}, newEdit, function(err, user) {
            if (err){
                var response = { error: "could not edit state"};
                res.json(response); 
            }
            else{
                response = { success: "edited state"};    
                res.json(response); 
            }
        });    
    });
router.route("/customers/:id/address/zip/:new")
    .put(function(req, res){
        var newEdit = { "address.zip": req.params.new }
        Customer.findOneAndUpdate({_id: req.params.id}, newEdit, function(err, user) {
            if (err){
                var response = { error: "could not edit zip"};
                res.json(response); 
            }
            else{
                response = { success: "edited zip"};    
                res.json(response); 
            }
        });    
    });

router.route("/customers/:id/friends")
    .get(function(req, res){
        Customer.find({_id: req.params.id}, function(err, customer){
            if (err){
                var response = { error: "could not get friends"};
                res.json(response);
            }
            else
                res.json(customer[0].friends);
        });     
    }) 

    .post(function(req, res){
        Customer.find({_id: req.params.id}, function(err, customer){
            var response; 
            if (err){
                response = { error: "could not get customer"};
                res.json(response);
            }
            else{
                var i; 
                var bool = 0; 
                for (i=0; i < customer[0].friends.length; i++){
                    if (customer[0].friends[i].id == req.body.id)
                        bool = 1; 
                }
                
                if (bool == 1){
                    response = { error: "friend already exists!"};
                    res.json(response);
                }
                else{
                    customer[0].friends.push(req.body); 
                    customer[0].save(function(err){
                        response = { success: "updated friends"};
                        if (err){
                            response = { error: "could not update friends"};
                            res.json(response);
                        }
                        else
                            res.json(response);
                    });
                }
            }
        });         
    });

router.route("/customers/:id/friends/:friendID/firstName/:newFirstName/lastName/:newLastName")
    .put(function(req, res){
        Customer.find({_id: req.params.id}, function(err, customer){
            var response; 
            if (err){
                response = { error: "could not get customer"};
                res.json(response);
            }
            else{
                var i; 
                var index = -1; 
                for(i = 0; i < customer[0].friends.length; i++)
                    if (customer[0].friends[i].id == req.params.friendID){
                        index = i; 
                        break;
                    }
                if(index != -1){ 
                    customer[0].friends[index].first_name = req.params.newFirstName;  
                    customer[0].friends[index].last_name = req.params.newLastName;
                    customer[0].save(function(err){
                        response = { success: "updated friend"};
                        if (err){
                            response = { error: "could not update friend"};
                            res.json(response);
                        }
                        else
                            res.json(response);
                    });
                }
                else{
                    response = { success: "input friend not a friend of the given customer"};
                    res.json(response);
                }
            }
        }); 
    }); 

router.route("/customers/:id/friends/:friendID")
    .delete(function(req, res){
        Customer.find({_id: req.params.id}, function(err, customer){
            var response; 
            if (err){
                response = { error: "could not get customer"};
                res.json(response);
            }
            else{
                var i; 
                var index = -1; 
                var bool = 0; 
                for(i = 0; i < customer[0].friends.length; i++)
                    if (customer[0].friends[i].id == req.params.friendID)
                        index = i; 
                
                if(index != -1){ 
                    customer[0].friends.splice(index, 1); 
                    customer[0].save(function(err){
                        response = { success: "deleted friend"};
                        if (err){
                            response = { error: "could not delete friend"};
                            res.json(response);
                        }
                        else
                            res.json(response);
                    });
                }
                else{
                    response = { success: "input friend not a friend of the given customer"};
                    res.json(response);
                }
            }
        }); 
    });

