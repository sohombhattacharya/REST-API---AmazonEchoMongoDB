var mongoose = require("mongoose"); 
var Transfer = require("../model/transfer");
var Account = require("../model/account");

function postTransfer(req, res){
    req.body.sender = req.params.id; 
    var newTransfer = new Transfer(req.body);
    newTransfer.validate(function(error){
            if (error){
                response = { error: "incorrectly formatted transfer"};
                res.json(response);
            }
            else{
                Account.find({_id: newTransfer.sender}, function(err, account){ 
                    var response; 
                    if (err){
                        response = { error: "could not get sender account"};
                        res.json(response);
                    }
                    else{
                        if (account.length == 0){
                            response = { error: "sender account does not exist"};
                            res.json(response);
                        }
                        else{
                            if (account[0].balance.value < newTransfer.amount.value){
                                response = { error: "amount exceeds sender account balance"};
                                res.json(response);
                            }
                            else{
                                Account.find({_id: newTransfer.receiver}, function(err1, account1){ 
                                    var response; 
                                    if (err1){
                                        response = { error: "could not get receiver account"};
                                        res.json(response);
                                    }
                                    else{
                                        if (account1.length == 0){
                                            response = { error: "receiver account does not exist"};
                                            res.json(response);
                                        }
                                        else{
                                            newTransfer.save(function(err2, transfer){
                                                var response; 
                                                if (err2){
                                                    response = { error: "could not add new transfer"};
                                                    res.json(response);
                                                }
                                                else{
                                                    account[0].balance.value = account[0].balance.value - newTransfer.amount.value;
                                                    account1[0].balance.value = account1[0].balance.value + newTransfer.amount.value;
                                                    var senderAccount = new Account(account[0]);
                                                    senderAccount.save(function(err3, result){
                                                        if (err3){
                                                            response = { error: "could not withdraw amount from sender account"};
                                                            res.json(response);
                                                        }
                                                        else{
                                                            var receiverAccount = new Account(account1[0]);
                                                            receiverAccount.save(function(err4, result1){
                                                                if (err4){
                                                                    response = { error: "could not deposit amount to receiver accont"};
                                                                    res.json(response);
                                                                }
                                                                else{
                                                                    response = { success: "completed transfer", body: transfer};    
                                                                    res.json(response);
                                                                }
                                                            });
                                                        }
                                                    });                                                    
                                                }
                                            });
                                        }
                                    }
                                });  
                            }
                        }
                    }
                });                 
            }
    });
}

function getTransfers(req, res){
    Transfer.find({}, function(err, transfers){
        var response; 
        if (err){
            response = { error: "could not get all transfers"};
            return res.json(response);
        }
        else{    
            response = transfers;
            return res.json(response);
        }
    });     
}

function getTransfersForAccount(req, res){
    Account.find({_id: req.params.id}, function(err, account){ 
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
                Transfer.find({sender: req.params.id}, function(err1, transfers){
                    var response; 
                    if (err1){
                        response = { error: "could not get all transfers"};
                        return res.json(response);
                    }
                    else{    
                        response = transfers;
                        return res.json(response);
                    }
                }); 
            }
        }
    });         
}

function getTransfer(req, res){
    Transfer.find({_id: req.params.id}, function(err, transfer){ 
        var response; 
        if (err){
            response = { error: "could not get transfer"};
            res.json(response);
        }
        else{
            if (transfer.length == 0){
                response = { error: "transfer does not exist"};
                res.json(response);
            }
            else{
                response = transfer[0]; 
                res.json(response);
            }
        }
    }); 
}

function deleteTransfer(req, res){
    Transfer.findOneAndRemove({_id: req.params.id}, function(err, transfer, result) {
        var response; 
        if (err || transfer == null){
            response = { error: "could not find and delete transfer"};
            res.json(response);
        }
        else{
            response = { success: "found and deleted transfer"};     
            res.json(response);
        }
    }); 
} 

function updateTransfer(req, res){ 
        var response; 
        var transferBody = new Transfer(req.body);
        transferBody.validate(function(error){
            if (error){
                response = { error: "incorrectly formatted transfer"};
                res.json(response);
            }    
            else{
                Transfer.find({_id: req.params.id}, function(err, transfer){
                    if (err){
                        response = { error: "could not find transfer"};
                        res.json(response);
                    }
                    else{
                        if (transfer.length == 0){
                            response = { error: "transfer does not exist"}; 
                            res.json(response);
                        }
                        else{
                            var updatedTransfer = Object.assign(transfer[0], req.body); 
                            updatedTransfer.save(function(err1, transfer1){
                                if (err1){
                                    response = { error: "could not update transfer"};
                                    res.json(response);
                                }
                                else{
                                    response = { success: "updated transfer", body: transfer1};
                                    res.json(response);
                                }
                            }); 
                        }
                    }
                }); 
            }
        });
}

module.exports = {postTransfer, getTransfers, getTransfer, deleteTransfer, updateTransfer, getTransfersForAccount};
