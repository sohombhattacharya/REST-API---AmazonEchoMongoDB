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
    var newAccount = new Account(req.body);
    newAccount.save(function(err, account){
        var response; 
        if (err){
            response = { error: "could not add new account"};
            res.json(response);
        }
        else{
            response = { success: "added customer", body: account};    
            res.json(response);
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
