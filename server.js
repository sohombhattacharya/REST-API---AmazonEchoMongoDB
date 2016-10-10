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

//router.route("/customers/:id/firstName/:new")
//    .put(customer.updateCustomerFirstName);
//      
//router.route("/customers/:id/lastName/:new")
//    .put(customer.updateCustomerLastName); 
//
//router.route("/customers/:id/address/streetNumber/:new")
//    .put(customer.updateCustomerAddressStreetNumber); 
//
//router.route("/customers/:id/address/streetName/:new")
//    .put(customer.updateCustomerAddressStreetName); 
//
//router.route("/customers/:id/address/city/:new")
//    .put(customer.updateCustomerAddressCity); 
//
//router.route("/customers/:id/address/state/:new")
//    .put(customer.updateCustomerAddressState); 
//
//router.route("/customers/:id/address/zip/:new")
//    .put(customer.updateCustomerAddressZip); 

router.route("/customers/:id/friends")
    .get(customer.getFriends);
//router.route("/customers/:id/friends/:friendID/firstName/:newFirstName/lastName/:newLastName")
//    .put(customer.updateFriendFirstNameAndLastName); 

router.route("/customers/:id/friends/:friendID")
    .post(customer.postFriend) 
    .delete(customer.deleteFriend); 

module.exports = router; 