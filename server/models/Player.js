/*eslint-disable*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    _id: {type: String},
    defense: {type:Number} ,
    health: { type: Number },
    damage: { type: Number },
    name: { type: String },
    currency:{ type: Number},
    dead:{type:Boolean},
    width:{type:String}
  });
  
  module.exports = mongoose.model('Player',playerSchema);