// module to read selected files
var fs = require('fs');

var express = require('express');
var router = express.Router();

var queryDB = require('../db/QueryDB');

// Middleware
var bodyParser = require('body-parser');

// variables to hold the search filters
var numQueries = "";
var query = "";

/* THE MAIN CODE - Updates users endpoint in the back end */
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.get('/', function(req, res, next) {
  queryDB.dbQuery(numQueries, query, function(result) {
    console.log("QueryDB called");
    res.json(result);
  });
});

router.post('/', function(req, res) {
  new Promise(function() {
    console.log('POST request:');
    numQueries = req.body.query.numQueries;
    query = req.body.query.query;
    console.log('numQueries = ' + numQueries + ' query = ' + query);
  }).then(function() {
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
