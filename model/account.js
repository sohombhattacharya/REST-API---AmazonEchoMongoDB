var mongoose = require("mongoose"); 
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var accountSchema = new Schema({  
        type: {type: String, required: true},
        nickname: {type: String, required: true},
        rewards: {type: Number, required: true},
        balance: {type: SchemaTypes.Double, required: true},
        account_number: {type: String, required: true},
        customer_id: {type: String, required: true}
}, {versionKey:false});
module.exports = mongoose.model('accounts', accountSchema);



