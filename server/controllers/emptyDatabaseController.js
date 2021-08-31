/*eslint-disable*/
var express = require('express');
var Item = require('../models/Item');
var Boss = require ('../models/Boss');
var Shop = require('../models/Shop');
var Player = require('../models/Player');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/rpgDB', { useNewUrlParser: true });

Shop.collection.drop()
Player.collection.drop()
Boss.collection.drop()
Item.collection.drop()