var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    location_id: String,
    title: String,
    description: String
});

var Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
