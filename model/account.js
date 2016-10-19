var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;
var accountSchema = new Schema({  
        _id: {type: String, required: true},
        type: {type: String, required: true},
        nickname: {type: String, required: true},
        rewards: {type: Number, required: true},
        balance: {type: Number, required: true},
        account_number: {type: String, required: true},
        customer_id: {type: String, required: true}
}, {versionKey:false});
module.exports = mongoose.model('account', accountSchema);