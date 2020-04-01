var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    code: String, // Should be like a constant string: e.g. FAR_PLAINS_FINISHED, RODE_PEGASUS
    description: String
});

var Event = mongoose.model("Event", EventSchema);
module.exports = Event;
