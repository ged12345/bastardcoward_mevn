var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ActionTypeSchema = new Schema({
    type: String,
    description: String,
});

/*
    {       'LOC' , GAME_CONSTANTS.LOCATION                },
    {       'ADD_OBJ' , GAME_CONSTANTS.ADD_OBJECT           },
    {       'REM_OBJ', GAME_CONSTANTS.REMOVE_OBJECT         },
    {       'FIGHT', GAME_CONSTANTS.BATTLE                  },
    {       'LUCK_TEST', GAME_CONSTANTS.LUCK_TEST            },
    {       'ADD_HEAL', GAME_CONSTANTS.ADD_HEALTH           },
    {       'REM_HEAL', GAME_CONSTANTS.REMOVE_HEALTH        },
    {       'RES_HEAL', GAME_CONSTANTS.RESTORE_HEALTH       },
*/

var ActionType = mongoose.model("ActionType", ActionTypeSchema);
module.exports = ActionType;
