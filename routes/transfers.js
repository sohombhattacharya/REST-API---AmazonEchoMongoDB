var mongoose = require("mongoose"); 
var Transfer = require("../model/transfer");


function postTransfer(req, res){
    req.body.sender = req.params.id; 
    var newTransfer = new Transfer(req.body);
    newTransfer.save(function(err, transfer){
        var response; 
        if (err){
            response = { error: "could not add new transfer"};
            res.json(response);
        }
        else{
            response = { success: "added transfer", body: transfer};    
            res.json(response);
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

module.exports = {postTransfer, getTransfers, getTransfer, deleteTransfer, updateTransfer};
