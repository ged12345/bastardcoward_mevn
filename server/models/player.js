var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Monster templates
var PlayerSchema = new Schema({
    name: String,
    health: Number,
    max_health: Number,
    chaos: Number,
    max_chaos: Number,
    chaos_spec: Array,
    brawl: Number,
    assassinate: Number,
    fighting_spec: Array,
    fate: Number,
});

var Player = mongoose.model("Player", PlayerSchema);
module.exports = Player;
