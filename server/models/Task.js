/*eslint-disable*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    
        description: {type:String},
        name: {type:String} ,
        
        reward:{type:Number}
      
  });
  
  module.exports = mongoose.model('Task',taskSchema);