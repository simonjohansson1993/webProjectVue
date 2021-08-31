/*eslint-disable*/

var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

// Return a list of all bosses
router.get('/', function(req, res, next) {
    Task.find(function(err, task) {
        if (err) { return next(err); }
        res.json({'task': task});
    });
});

// Create a new boss
router.post('/', function(req, res, next) {
    var task = new Task(req.body);
    task.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(task);
    });
});

// Return the boss with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Task.findById(id, function(err, task) {
        if (err) { return next(err); }
        if (task === null) {
            return res.status(404).json({'message': 'Task not found'});
        }
        res.json(task);
    });
});

// Delete the boss with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Task.findOneAndDelete({_id: id}, function(err, task) {
        if (err) { return next(err); }
        if (task === null) {
            return res.status(404).json({'message': 'Task not found'});
        }
        res.json(task);
    });
});



module.exports = router;