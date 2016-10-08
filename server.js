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
}, { versionKey: false });
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
//    id = req.params.id
    res.json({ message: "testing api" });   
});

router.route("/customers")

    .get(function(req, res){
    
    })

    .post(function(req, res){
        var newCustomer = new Customer({
            "_id": "57f5ae7c360f81f104543a888",
            "first_name": "test",
            "last_name": "test123",
            "address": {
                "street_number": "ttt",
                "street_name": "stst",
                "city": "State College",
                "state": "PA",
                "zip": "16802"
            },
            "friends": [
                {
                    "id": "ee",
                    "first_name": "ytu",
                    "last_name": "dfgd"
                },
                {
                    "id": "st",
                    "first_name": "bfc",
                    "last_name": "cch"
                }
            ]
        });
        
        newCustomer.save(function(err){
            if (err) console.log("error adding customer"); 
            else
                res.json({ message: "added customer" }); 
        }); 
    });


router.route("/customers/:id")

    .get(function(req, res){

    })

    .put(function(req, res){
    
    })

    .delete(function(req, res){

    });



