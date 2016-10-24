var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectId;
var addressSchema = new Schema({
    street_number: {type: String, required: true},
    street_name: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true}
}, { versionKey: false, _id : false }); 
var customerSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    address: {type: addressSchema, required: true},
    friends: {type: [String], default: []}
}, { versionKey: false});
module.exports = mongoose.model('customers', customerSchema);