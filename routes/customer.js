var mongoose = require("mongoose"); 
var Customer = require("../model/customer"); 

function getCustomers(req, res){
    Customer.find({}, function(err, customers){
        if (err){
            var response = { error: "could not get all customers"};
            res.json(response);
        }
        else    
            res.json(customers);
    });     
}

function postCustomer(req, res){
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
}

function getCustomer(req, res){
    Customer.find({_id: req.params.id}, function(err, customer){ 
                if (err){
                    var response = { error: "could not get customer"};
                    res.json(response);
                }
                else
                    res.json(customer[0]);
            }); 
}

function deleteCustomer(req, res){
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
}

function updateCustomerFirstName(req, res){
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
}
function updateCustomerLastName(req, res){
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
}
function updateCustomerAddressStreetNumber(req, res){
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
}
function updateCustomerAddressStreetName(req, res){
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
}
function updateCustomerAddressCity(req, res){
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
}

function updateCustomerAddressState(req, res){
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
}

function updateCustomerAddressZip(req, res){
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
}

function getFriends(req, res){
        Customer.find({_id: req.params.id}, function(err, customer){
            if (err){
                var response = { error: "could not get friends"};
                res.json(response);
            }
            else
                res.json(customer[0].friends);
        }); 
}

function postFriend(req, res){
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
}
function updateFriendFirstNameAndLastName(req, res){
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
}
function deleteFriend(req, res){
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
}

module.exports = {getCustomers, postCustomer, getCustomer, updateCustomerFirstName, updateCustomerLastName, updateCustomerAddressStreetNumber, 
                 updateCustomerAddressStreetName, updateCustomerAddressCity, updateCustomerAddressState, updateCustomerAddressZip, getFriends,
                 postFriend, updateFriendFirstNameAndLastName, deleteFriend, deleteCustomer};