var express = require('express');        
var app = express();                 
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var CUSTOMERS_COLLECTION = "customers";
var port = process.env.PORT || 8080;        
var router = express.Router();              
var db; 
var mongodb_uri = "mongodb://test:test123@ds053136.mlab.com:53136/psu-capitalone"; // NEED TO USE HEROKU CONFIG FILES FOR USER/PASS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongodb.MongoClient.connect(mongodb_uri, function(err, database){

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

router.get('/', function(req, res) {
//    id = req.params.id
    res.json({ message: "testing api" });   
});
