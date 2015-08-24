var express = require('express');
var router = express.Router();
var Puppy = require('../models/puppies');
var utilities = require('../logic/puppyUtility');

// GET - all puppies
router.get('/puppies', function(req, res, next) {
  res.json(utilities.allGet());
});

// GET - single puppy
router.get('/puppy/:id', function(req, res, next) {
  var response = utilities.singleGet(req.params.id);
  res.json(response);
});

// POST - add to list of puppies
router.post('/puppies', function(req, res, next) {
  var response = utilities.handlePost(req.body.puppyID, req.body.puppyName, req.body.puppyAge);
  res.json(response);
});

// update a single puppy
router.put('/puppy/:id', function(req, res, next) {
  // add validation for if puppyAge is an integer
  var response = utilities.handlePut(req.params.id, req.body);
  res.json(response);
});

router.delete('/puppy/:id', function(req, res, next) {
  var response = utilities.handleDelete(req.params.id);
  res.json(response);
});

module.exports = router;
