/*eslint-disable*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bossSchema = new Schema({
    description: {type:String},
    difficulty: {type:String} ,
    health: { type: Number },
    damage: { type: Number },
    name: { type: String },
    image: {type: String},
    healthBar: {type:Number}
  });
  
  module.exports = mongoose.model('Boss',bossSchema);
