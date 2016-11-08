var mongoose = require("mongoose"); 
var Customer = require("../model/customer"); 

function getCustomers(req, res){
    Customer.find({}, function(err, customers){
        var response; 
        if (err){
            response = { error: "could not get all customers"};
            return res.json(response);
        }
        else{    
            response = customers;
            return res.json(response);
        }
    });     
}

function postCustomer(req, res){
    var newCustomer = new Customer(req.body);
    newCustomer.validate(function(error){
            if (error){
                response = { error: "incorrectly formatted customer"};
                res.json(response);
            }
            else{    
                newCustomer.save(function(err, customer){
                    var response; 
                    if (err){
                        response = { error: "could not add new customer"};
                        res.json(response);
                    }
                    else{
                        response = { success: "added customer", body: customer};    
                        res.json(response);
                    }
                });
            }
    });
}

function getCustomer(req, res){
    Customer.find({_id: req.params.id}, function(err, customer){ 
        var response; 
        if (err){
            response = { error: "could not get customer"};
            res.json(response);
        }
        else{
            if (customer.length == 0){
                response = { error: "customer does not exist"};
                res.json(response);
            }
            else{
                response = customer[0]; 
                res.json(response);
            }
        }
    }); 
}

function deleteCustomer(req, res){
    Customer.findOneAndRemove({_id: req.params.id}, function(err, doc, result) {
        var response; 
        if (err || doc == null){
            response = { error: "could not find and delete customer"};
            res.json(response);
        }
        else{
            Customer.update({}, {$pull: {"friends": req.params.id}}, {multi: true}, function(err){
                if (err){
                    response = { error: "could not find and delete current customer as friends of others"};
                    res.json(response);
                }
                else{
                    response = { success: "found and deleted customer"};     
                    res.json(response);
                }
            }); 
        }
    }); 
}

function updateCustomer(req, res){ 
        var response; 
        var customerBody = new Customer(req.body);
        customerBody.validate(function(error){
            if (error){
                response = { error: "incorrectly formatted customer"};
                res.json(response);
            }
            else{
                Customer.find({_id: req.params.id}, function(err, customer){
                    if (err){
                        response = { error: "could not find customer"};
                        res.json(response);
                    }
                    else{
                        if (customer.length == 0){
                            response = { error: "customer does not exist"}; 
                            res.json(response);
                        }
                        else{
                            var updatedCustomer = Object.assign(customer[0], req.body); 
                            updatedCustomer.save(function(err, customer1){
                                if (err){
                                    response = { error: "could not update customer"};
                                    res.json(response);
                                }
                                else{
                                    response = { success: "updated customer", body: customer1};
                                    res.json(response);
                                }
                            }); 
                        }
                    }
                });            
            }
        }); 
}

function getFriends(req, res){
        Customer.find({_id: req.params.id}, function(err, customer){
            var response; 
            if (err){
                response = { error: "could not get friends"};
                res.json(response);
            }
            else{
                if (customer.length == 0){
                    response = { error: "customer does not exist"}; 
                    res.json(response);
                }
                else{
                    response = customer[0].friends;
                    res.json(response);
                }
            }
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
                if (customer.length == 0){
                    response = { error: "customer does not exist"}; 
                    res.json(response);
                }
                else{
                    
                    Customer.find({_id: req.params.friendID}, function(err, friend){
                        if (err){
                            response = {error: "error when trying to verify friend-to-add is a customer"}; 
                            res.json(response); 
                        }
                        else{
                            if (friend.length == 0){
                                response = {error: "friend to add does not exist as a customer"}; 
                                res.json(response); 
                            }
                            else{
                                var i; 
                                var bool = 0; 
                                for (i=0; i < customer[0].friends.length; i++){
                                    if (customer[0].friends[i].id == req.params.friendID)
                                        bool = 1; 
                                }
                                if (bool == 1){
                                    response = { error: "friend already exists!"};
                                    res.json(response);
                                }
                                else{
                                    customer[0].friends.push(req.params.friendID);
                                    customer[0].save(function(err, updatedCustomer){
                                        if (err){
                                            response = { error: "could not add friends"};
                                            res.json(response);
                                        }
                                        else{
                                            response = { success: "added friend", body: updatedCustomer};
                                            res.json(response);
                                        }
                                    });
                                }                             
                            
                            }                       
                        }
                    
                    });
                }
            }
        });
}

function deleteFriend(req, res){
            Customer.update({_id: req.params.id}, {$pull: {"friends": req.params.friendID}}, function(err, raw){
                var response; 
                if (err || raw.nModified == 0){
                    response = { error: "could not remove friend"};
                    res.json(response);
                }
                else{
                    Customer.find({_id: req.params.id}, function(err1, customer){ 
                        var response; 
                        if (err1){
                            response = { error: "could not get updated customer"};
                            res.json(response);
                        }
                        else{
                            if (customer.length == 0){
                                response = { error: "updated customer does not exist"};
                                res.json(response);
                            }
                            else{
                                response = { success: "removed friend", body: customer[0]}; 
                                res.json(response);
                            }
                        }
                    });                     
                }
            });     
}

module.exports = {getCustomers, postCustomer, getCustomer, getFriends, postFriend, deleteFriend, deleteCustomer, updateCustomer};