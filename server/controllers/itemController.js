/*eslint-disable*/

var express = require('express');
var router = express.Router();
var Item = require('../models/Item');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Return a list of all bosses
router.get('/', function (req, res, next) {
    Item.find(function (err, items) {
        if (err) { return next(err); }
        res.json({ 'Item': items });
    });
});

// Create a new boss
router.post('/', function (req, res, next) {
    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    description:req.body.description,
    type: req.body.type,
    attackValue:req.body.attackValue,
    defenseValue:req.body.defenseValue,
    price:req.body.price
      });
    item.save(function (err) {
        if (err) { return next(err); }
        res.status(201).json(item);
    });
});

// Return the boss with the given ID
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Item.findById(id, function (err, item) {
        if (err) { return next(err); }
        if (item === null) {
            return res.status(404).json({ 'message': 'Item not found' });
        }
        res.json(item);
    });
});

// Delete the boss with the given ID
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    Item.findOneAndDelete({ _id: id }, function (err, item) {
        if (err) { return next(err); }
        if (item === null) {
            return res.status(404).json({ 'message': 'Item not found' });
        }
        res.json(item);
    });
});

router.delete('/', function(req, res, next) {
    
    Item.deleteMany({},function(err, items) {
        if (err) { return next(err); }
        if (items === null) {
            return res.status(404).json({'message': 'Item not found'});
        }
        res.json({"Item": items});
    });
});


router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Item.findById(id, function(err, item) {
        if (err) { return next(err); }
        if (item == null) {
            return res.status(404).json({"message": "Item not found"});
        }
        item.name = (req.body.name|| item.name);
        item.description = (req.body.description || item.description);
        item.type = (req.body.type || item.type);
        item.attackValue = (req.body.attackValue || item.attackValue);
        item.defenceValue = (req.body.defenceValue || item.defenceValue);
        item.price = (req.body.price || item.price);
       
        item.save();
        res.json(item);
    });
});

router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Item.findById(id, function(err, item) {
        if (err) { return next(err); }
        if (item == null) {
            return res.status(404).json({"message": "Item not found"});
        }
        item.name = (req.body.name);
        item.description = (req.body.description);
        item.type = (req.body.type);
        item.attackValue = (req.body.attackValue);
        item.defenceValue = (req.body.defenceValue);
        item.price = (req.body.price);

        item.save();
        res.json(item);
    });
});

module.exports = router;