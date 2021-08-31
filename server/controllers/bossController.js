/*eslint-disable*/

var express = require('express');
var router = express.Router();
var Boss = require('../models/Boss');

// Return a list of all bosses

router.get('/', function (req, res, next) {
    Boss.find(function (err, bosses) {
        if (err) { return next(err); }
        res.json({ 'Boss': bosses });
    });
});
// Create a new boss
router.post('/', function(req, res, next) {
    var boss = new Boss(req.body);
    boss.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(boss);
    });
});

// Return the boss with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Boss.findById(id, function(err, boss) {
        if (err) { return next(err); }
        if (boss === null) {
            return res.status(404).json({'message': 'Boss not found'});
        }
        res.json(boss);
    });
});

// Delete the boss with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Boss.findOneAndDelete({_id: id}, function(err, boss) {
        if (err) { return next(err); }
        if (boss === null) {
            return res.status(404).json({'message': 'Boss not found'});
        }
        res.json(boss);
    });
});

router.delete('/', function(req, res, next) {
    
    Boss.deleteMany({},function(err, bosses) {
        if (err) { return next(err); }
        if (bosses === null) {
            return res.status(404).json({'message': 'Boss not found'});
        }
        res.json({"Boss": bosses});
    });
});




router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Boss.findById(id, function(err, boss) {
        if (err) { return next(err); }
        if (boss == null) {
            return res.status(404).json({"message": "Boss not found"});
        }
        boss.description = (req.body.description|| boss.description);
        boss.difficulty = (req.body.difficulty || boss.difficulty);
        boss.health = (req.body.health || boss.health);
        boss.basedamage = (req.body.basedamage || boss.basedamage);
        boss.damage = (req.body.damage || boss.damage);
        boss.maxHealth = (req.body.maxHealth || boss.maxHealth);
        boss.name = (req.body.name || boss.name);
       
        boss.save();
        res.json(boss);
    });
});

router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Boss.findById(id, function(err, boss) {
        if (err) { return next(err); }
        if (boss == null) {
            return res.status(404).json({"message": "Boss not found"});
        }
        boss.description = (req.body.description);
        boss.difficulty = (req.body.difficulty);
        boss.health = (req.body.health);
        boss.baseDamage = (req.body.baseDamage);
        boss.damage = (req.body.damage);
        boss.maxHealth = (req.body.maxHealth);
        boss.name = (req.body.name);
        boss.save();
        res.json(boss);
    });
});



module.exports = router;