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

module.exports = {getAccounts, getCustomerAccounts, postAccount};
