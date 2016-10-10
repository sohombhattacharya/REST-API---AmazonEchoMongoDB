var mongoose = require("mongoose"); 
var Customer = require("../model/customer"); 

function getCustomers(req, res){
    Customer.find({}, function(err, customers){
        var response; 
        if (err)
            response = { error: "could not get all customers"};
        else    
            response = customers;
        res.json(response);
    });     
}

function postCustomer(req, res){
    var newCustomer = new Customer(req.body);
    newCustomer.save(function(err){
        var response; 
        if (err)
            response = { error: "could not add new customer"};
        else
            response = { success: "added customer"};    
        res.json(response); 
    });
}

function getCustomer(req, res){
    Customer.find({_id: req.params.id}, function(err, customer){ 
        var response; 
        if (err)
            response = { error: "could not get customer"};
        else{
            if (customer.length == 0)
                response = { error: "customer does not exist"}; 
            else
                response = customer[0]; 
        }
        res.json(response); 
    }); 
}

function deleteCustomer(req, res){
    Customer.findOneAndRemove({_id: req.params.id}, function(err) {
        var response; 
        if (err)
            response = { error: "could not find and delete customer"};
        else{
            Customer.update({}, {$pull: {"friends": req.params.id}}, {multi: true}, function(err){
                if (err)
                    response = { error: "could not find and delete current customer as friends of others"};
                else
                    response = { success: "found and deleted customer"};     
            }); 
        }
        res.json(response);
    }); 
}

function updateCustomer(req, res){ 
        var response; 
        Customer.find({_id: req.params.id}, function(err, customer){
            if (err)
                response = { error: "could not find customer"};
            else{
                if (customer.length == 0)
                    response = { error: "customer does not exist"}; 
                else{
                    var updatedCustomer = Object.assign(customer[0], req.body); 
                    updatedCustomer.save(function(err, customer){
                        if (err)
                            response = { error: "could not update customer"};
                        else
                            response = { success: "updated customer"};
                    }); 
                }
            }
            res.json(response);
        }); 
}

function getFriends(req, res){
        Customer.find({_id: req.params.id}, function(err, customer){
            var response; 
            if (err)
                response = { error: "could not get friends"};
            else{
                if (customer.length == 0){
                    response = { error: "customer does not exist"}; 
                }
                else
                    response = customer[0].friends;
            }
            res.json(response);
        }); 
}

function postFriend(req, res){
        Customer.find({_id: req.params.id}, function(err, customer){
            var response; 
            if (err)
                response = { error: "could not get customer"};
            else{
                if (customer.length == 0)
                    response = { error: "customer does not exist"}; 
                else{
                    var i; 
                    var bool = 0; 
                    for (i=0; i < customer[0].friends.length; i++){
                        if (customer[0].friends[i].id == req.params.friendID)
                            bool = 1; 
                    }
                    if (bool == 1)
                        response = { error: "friend already exists!"};
                    else{
                        customer[0].friends.push(req.params.friendID); 
                        customer[0].save(function(err){
                            if (err)
                                response = { error: "could not add friends"};
                            else
                                response = { success: "added friend"};
                        });
                    }
                }
            }
            res.json(response);
        });
}

function deleteFriend(req, res){
            Customer.update({_id: req.params.id}, {$pull: {"friends": req.params.friendID}}, function(err){
                var response; 
                if (err)
                    response = { error: "could not remove friend"};
                else
                    response = { success: "removed friend"}; 
                res.json(response); 
            });     
}

module.exports = {getCustomers, postCustomer, getCustomer, getFriends, postFriend, deleteFriend, deleteCustomer, updateCustomer};