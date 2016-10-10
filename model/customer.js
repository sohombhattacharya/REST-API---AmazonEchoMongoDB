var mongoose = require("mongoose"); 
var Schema = mongoose.Schema; 
var customerSchema = new Schema({
    _id: String,
    first_name: String,
    last_name: String,
    address: {
        street_number: String,
        street_name: String,
        city: String,
        state: String,
        zip: String
    },
    friends: [{id: String, first_name: String, last_name: String}]
}, { versionKey: false});
module.exports = mongoose.model('customer', customerSchema);