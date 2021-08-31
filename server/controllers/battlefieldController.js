/*eslint-disable*/

var express = require('express');
var router = express.Router();
var Battlefield = require('../models/Battlefield');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Return a list of all bosses
router.get('/', function(req, res, next) {
    Battlefield.find(function(err, battlefields) {
        if (err) { return next(err); }
        res.json({'Battlefield': battlefields});
    });
});

// Create a new boss
router.post('/', function(req, res, next) {
    

    const battlefield = new Battlefield({
        _id: new mongoose.Types.ObjectId(),
        player : req.body.player,
        boss:  req.body.boss

    });
    
    
    battlefield.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(battlefield);
    });
});

// Return the boss with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Battlefield.findById(id, function(err, battlefield) {
        if (err) { return next(err); }
        if (battlefield === null) {
            return res.status(404).json({'message': 'Boss not found'});
        }
        res.json(battlefield);
    }).populate('player').populate('boss');
});

// Delete the boss with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Battlefield.findOneAndDelete({_id: id}, function(err, battlefield) {
        if (err) { return next(err); }
        if (battlefield === null) {
            return res.status(404).json({'message': 'Boss not found'});
        }
        res.json(battlefield);
    });
});




module.exports = router;