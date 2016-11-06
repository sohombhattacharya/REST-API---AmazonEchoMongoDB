var mongoose = require("mongoose"); 
var Account = require("../model/account");

function getAccounts(req, res){
    Account.find({}, function(err, accounts){
        var response; 
        if (err){
            response = { error: "could not get all accounts"};
            return res.json(response);
        }
        else{    
            response = accounts;
            return res.json(response);
        }
    });     
}
function postAccount(req, res){
    Account.find({customer_id: req.params.id}, function(err, account){ 
        var response; 
        if (err){
            response = { error: "error when trying to get account"};
            res.json(response);
        }
        else{
            if (account.length != 0){
                response = { error: "this customer already has an account!"};
                res.json(response);
            }
            else{
                var newAccount = new Account(req.body);
                newAccount.customer_id = req.params.id;
                newAccount.save(function(err1, account1){
                    var response; 
                    if (err1){
                        response = { error: "could not add new account"};
                        res.json(response);
                    }
                    else{
                        response = { success: "added customer", body: account1};    
                        res.json(response);
                    }
                });                
            }
        }
    });     
}

function getCustomerAccounts(req, res){
    Account.find({customer_id: req.params.id}, function(err, account){ 
        var response; 
        if (err){
            response = { error: "could not get account"};
            res.json(response);
        }
        else{
            if (account.length == 0){
                response = { error: "account does not exist"};
                res.json(response);
            }
            else{
                response = account[0]; 
                res.json(response);
            }
        }
    }); 
}
function updateAccount(req, res){ 
        var response; 
        req.body.customer_id = req.params.id;
        var accountBody = new Account(req.body);
        accountBody.validate(function(error){
            if (error){
                response = { error: "incorrectly formatted account"};
                res.json(response);
            }    
            else{
                Account.find({customer_id: req.params.id}, function(err, account){
                    if (err){
                        response = { error: "could not find account"};
                        res.json(response);
                    }
                    else{
                        if (account.length == 0){
                            response = { error: "account does not exist"}; 
                            res.json(response);
                        }
                        else{
                            var updatedAccount = Object.assign(account[0], req.body); 
                            updatedAccount.save(function(err1, account1){
                                if (err1){
                                    response = { error: "could not update account"};
                                    res.json(response);
                                }
                                else{
                                    response = { success: "updated account", body: account1};
                                    res.json(response);
                                }
                            }); 
                        }
                    }
                }); 
            }
        });
}
function deleteAccount(req, res){
    Account.findOneAndRemove({customer_id: req.params.id}, function(err, account, result) {
        var response; 
        if (err || account == null){
            response = { error: "could not find and delete account"};
            res.json(response);
        }
        else{
            response = { success: "found and deleted account"};     
            res.json(response);
        }
    }); 
}

module.exports = {getAccounts, getCustomerAccounts, postAccount, updateAccount, deleteAccount};
