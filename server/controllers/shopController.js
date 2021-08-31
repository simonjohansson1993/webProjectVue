/*eslint-disable*/

var express = require('express');
var router = express.Router();
var Shop = require('../models/Shop');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Item = require('../models/Item');
// Return a list of all bosses
router.get('/', function(req, res, next) {
    Shop.find(function(err, shops) {
        if (err) { return next(err); }
        res.json({'Shop': shops});
    });
});

// Create a new shop
router.post('/', function(req, res, next) {
    
    const shop = new Shop({
            _id: new mongoose.Types.ObjectId(),
            name : req.body.name,
            items:  req.body.items
                
            
               
    });
    shop.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(shop);
    });
});
    //-------CREATES SHOP ITEMS IN THE SHOP----------
    router.post('/:id/items', function (req, res, next){
        var shopId = req.params.id;
        const item = new Item({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
        description:req.body.description,
        type: req.body.type,
        attackValue:req.body.attackValue,
        defenseValue:req.body.defenseValue,
        price:req.body.price
          });
        Shop.findById(shopId,function(err,foundShop){
            if (err){
                return next (err);
            }
            if (foundShop === null){
                return res.status(404).json({"message":'Shop not found'});
            }
            item.save(function(err,savedItem){
                if (err){
                    return next (err);
                }
                foundShop.items.push(savedItem._id);
                foundShop.save();
                return res.json({savedItem});
            });
        });
    });
    //Puts a shop with an empty items array. 
    router.put('/:id', function(req, res, next) {
        var id = req.params.id;
        Shop.findById(id, function(err, shop) {
            if (err) { return next(err); }
            if (shop == null) {
                return res.status(404).json({"message": "Shop not found"});
            }
            shop.name= (req.body.name);
            shop.items=(req.body.items);
            shop.save();
            res.json(shop);
        });
    });
    

// Return the shop with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Shop.findById(id, function(err, shop) {
        if (err) { return next(err); }
        if (shop === null) {
            return res.status(404).json({'message': 'Shop not found'});
        }
        res.json(shop);
    }).populate('items');
});
//----------GET ALL ITEMS FROM A SPECIFIC SHOP---------\\
router.get('/:id/items', function(req, res, next) {
    var id = req.params.id;
    Shop.findById(id, function(err, shop) {
        if (err) { return next(err); }
        if (shop === null) {
            return res.status(404).json({'message': 'Shop not found'});
        }
        res.json(shop.items);
    }).populate('items');

});
//---------GET AN ITEM FROM THE SPECIFIC SHOP----------------\\



router.get('/:id/items/:sid', function(req, res, next) {
    var id = req.params.id;
    Shop.findById(id, function(err, shop) {
        if (err) { return next(err); }
        if (shop === null) {
            return res.status(404).json({'message': 'Shop not found'});
        }
        var sid = req.params.sid;
        Item.findById(sid,function(err,item){
            if (err) { return next(err); }
            if (item === null) {
                return res.status(404).json({'message': 'Item not found'});
            }  
        
        res.json(shop.item);
        })
    
    }).populate('items');
    
});



// Delete the shop with the given ID

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Shop.findOneAndDelete({_id: id}, function(err, shop) {
        if (err) { return next(err); }
        if (shop === null) {
            return res.status(404).json({'message': 'Shop not found'});
        }
        res.json(shop);
    });
});

// DELETE AN ITEM FROM A GIVEN SHOP


router.delete('/:id/items/:sid', function(req, res, next) {
    var id = req.params.id;
    var sid = req.params.sid;
    Shop.findByIdAndUpdate(
        id, { $pull: { "items": sid } }, { safe: false, upsert: false },
        function(err, shop) {
            if (err) { return handleError(res, err); }
            if (shop === null) {
                return res.status(404).json({'message': 'Shop not found'});
            }
            return res.status(200).json(shop.items);
        });
        });


module.exports = router;