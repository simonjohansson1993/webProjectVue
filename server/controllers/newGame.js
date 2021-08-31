/*eslint-disable*/
var express = require('express');
var Item = require('../models/Item');
var Boss = require ('../models/Boss');
var Shop = require('../models/Shop');
var Player = require('../models/Player');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/rpgDB', { useNewUrlParser: true });

function newPlayer() {
  var player = new Player({
      _id: "1",
      name: "Simon",
      currency: 0,
      health:100,
      damage:1000,
      defense: 100
  })
  player.save(function(err,) {
    if (err) { return console.log(err); }
    console.log('Player saved!');
  });
}
function newShop (){
  var shop = new Shop({
      _id: "10",
      name: "The Shop",
      items: []
  });
  shop.save(function(err,) {
    if (err) { return console.log(err); }
    console.log('Shop saved!');
  });
}

  Player.count({_id: '1'}, function (err, count){ 
  if(count===0){
      newPlayer()
  }else{
    console.log('Player 1 already exists');
  }
}); 
Shop.count({_id: '10'}, function (err, count){ 
  if(count===0){
      newShop()
  }else{
    console.log('Shop 10 already exists');
  }
}); 


