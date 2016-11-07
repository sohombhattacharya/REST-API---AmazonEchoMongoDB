var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;
var transferSchema = new Schema({  
        type: {type: String, required: true},
        sender: {type: String, required: true},
        receiver: {type: String, required: true},
        amount: {type: Number, required: true},
        timestamp: {type: Date, required: true},
        description: {type: String, required: true}
}, {versionKey:false}); 
module.exports = mongoose.model('transfer', transferSchema);