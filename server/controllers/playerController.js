/*eslint-disable*/

var express = require('express');
var router = express.Router();
var Player = require('../models/Player');

// Return a list of all bosses
router.get('/', function(req, res, next) {
    Player.find(function(err, players) {
        if (err) { return next(err); }
        res.json({'players': players});
    });
});

// Create a new boss
router.post('/', function(req, res, next) {
    var player = new Player(req.body);
    player.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(player);
    });
});

// Return the boss with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Player.findById(id, function(err, player) {
        if (err) { return next(err); }
        if (player === null) {
            return res.status(404).json({'message': 'Player not found'});
        }
        res.json(player);
    });
});

// Delete the boss with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Player.findOneAndDelete({_id: id}, function(err, player) {
        if (err) { return next(err); }
        if (player === null) {
            return res.status(404).json({'message': 'Player not found'});
        }
        res.json(player);
    });
});



router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Player.findById(id, function(err, player) {
        if (err) { return next(err); }
        if (player == null) {
            return res.status(404).json({"message": "Player not found"});
        }
        player.defense = (req.body.defense|| player.defense);
        player.health = (req.body.health || player.health);
        player.baseDamage = (req.body.baseDamage || player.baseDamage);
        player.damage = (req.body.damage || player.damage);
        player.maxHealth = (req.body.maxHealth || player.maxHealth);
        player.name = (req.body.name || player.name);
        player.currency = (req.body.currency||player.currency);
        player.dead = (req.body.dead||player.dead);
        player.width = (req.body.width||player.width);
        
        player.save();
        res.json(player);
    });
});

router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Player.findById(id, function(err, player) {
        if (err) { return next(err); }
        if (player == null) {
            return res.status(404).json({"message": "Player not found"});
        }
        player.defense = (req.body.defense);
        player.health = (req.body.health);
        player.baseDamage = (req.body.baseDamage);
        player.damage = (req.body.damage);
        player.maxHealth = (req.body.maxHealth);
        player.name = (req.body.name);
        player.currency = (req.body.currency);

        player.save();
        res.json(player);
    });
});



module.exports = router;