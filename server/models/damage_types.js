var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Monster templates
var DamageTypeSchema = new Schema({
    name: String,
    description: String,
    // d6 + 3 etc. What do we do for magic? Perhaps the name of the magic spell and effects (damage, luck, fucks with your specific skills)
    damage: String,
    // This can specify health, magic, or a specific skill reduction in points)
    modifier: String,
});

var DamageType = mongoose.model("DamageType", DamageTypeSchema);
module.exports = DamageType;
