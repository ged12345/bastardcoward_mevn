var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Monster templates
var MonsterSchema = new Schema({
    name: String,
    description: String,
    health: Number,
    magic: Number,
    // Can have multiple types of damage - so magic and weapon damage
    damage_types: Array,
});

var Monster = mongoose.model("Monster", MonsterSchema);
module.exports = Monster;
