var mongoose = require("mongoose"); 
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var transferSchema = new Schema({  
        type: {type: String, required: true},
        sender: {type: String, required: true},
        receiver: {type: String, required: true},
        amount: {type: SchemaTypes.Double, required: true},
        description: {type: String, required: true}
}, {versionKey:false, timestamps: true}); 
module.exports = mongoose.model('transfer', transferSchema);