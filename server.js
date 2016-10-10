var express = require('express');        
var app = express();                 
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var config = require("config"); 
var customer = require("./routes/customer"); 
var port = process.env.PORT || 8080;        
var router = express.Router();              
var Schema = mongoose.Schema; 
var ObjectID = mongoose.Schema.Types.ObjectId;
var db;
mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, function(err, database){
    if (err){
        console.log(err);
        console.log("error"); 
        process.exit(1);
    }
    db = database; 
    console.log("Database connection successful"); 
    var server = app.listen(port, function(){
        console.log("app init"); 
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());         
        app.use('/api', router);           
        console.log("App is up"); 
    });
});
router.route("/").get(function(req, res) {
    res.json({ message: "capital one rest api" });   
});

router.route("/customers")
    .get(customer.getCustomers)
    .post(customer.postCustomer);

router.route("/customers/:id")
    .get(customer.getCustomer)
    .put(customer.updateCustomer)
    .delete(customer.deleteCustomer);

router.route("/customers/:id/friends")
    .get(customer.getFriends);

router.route("/customers/:id/friends/:friendID")
    .post(customer.postFriend) 
    .delete(customer.deleteFriend); 

module.exports = router; 