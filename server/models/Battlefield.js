/*eslint-disable*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var battlefieldSchema = new Schema({
    boss: {  type: Schema.Types.ObjectId, ref: "Boss" } ,
    player: {  type: Schema.Types.ObjectId, ref: "Player" } 
  });
  
  module.exports = mongoose.model('Battlefield',battlefieldSchema);
