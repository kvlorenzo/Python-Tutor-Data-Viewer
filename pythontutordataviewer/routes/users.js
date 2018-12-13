// The directory name to the data sets
const DATA_DIR = '/../../../v2/data/pairs/';

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

/**
 * returns a number between 0 and the upper bound (exclusive)
 * @param {number} upperBound the exclusive upper bound of the random number
 * @return {number} the genereated random number
 */
function getRandomIndex(upperBound) {
  return Math.floor(Math.random() * upperBound);
}

/**
 * generates an array of random files from a directory
 * @param {number} numFiles the number of files to retrieve
 * @param {string} dir the directory to retrieve the random files from
 * @return {string array} an array of the names of the random files
 */
function getRandomFiles(numFiles, dir) {
  var fileArr = [];

  // read directory and get files
  var fileList = fs.readdirSync(dir);

  for (let i = 0; i < numFiles; i++) {
    var randIdx = getRandomIndex(fileList.length);
    fileArr.push(dir + fileList[randIdx]);   
  } 
  return fileArr;
}

/**
 * parse a JSON file for the good code and the bad code. If there are multiple
 * programs in one file, we will just choose one to return
 * @param {string} fileName the name of the JSON file to parse
 * @return {Object} a JSON object of one line of the file content
 */
function readFile(fileName) {
  var fileContent = fs.readFileSync(fileName, 'utf-8');
  var lines = fileContent.split('\n');
  return JSON.parse(lines[getRandomIndex(lines.length - 1)]);
}

/**
 * creates an array of all the JSON objects from an array of files
 * @param {string array} fileArr the array to parse the JSON objects from
 * @return {Object array} an array of JSON objects made from the files
 */
function parseJSON(fileArr) {
  var programsList = [];
  for (let i = 0; i < fileArr.length; i++) {
    var curProgram = readFile(fileArr[i]);
    var goodBadJSON = {"bad": curProgram.bad, "fix": curProgram.fix};
    programsList.push(goodBadJSON);
  }
  return programsList;
}


/* THE MAIN CODE - Reads in 20 files and passes their info to front end  */
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.get('/', function(req, res, next) {
 /* console.log("File reads starting...");
  var startTime = new Date();
  var filesArr = getRandomFiles(20, __dirname + DATA_DIR);
  var goodBadCode = parseJSON(filesArr);
  var endTime = new Date();
  console.log("File reads successful.");
  console.log("Time to parse files: " + 
    (endTime - startTime) + " milliseconds");
  res.json(goodBadCode); */

  queryDB.dbQuery(numQueries, query, function(result) {
    console.log("QueryDB called");
    res.json(result);
  });

});

router.post('/', function(req, res) {
  console.log('POST request:');
  console.dir(req.body);
  numQueries = req.body.data.numQueries;
  query = req.body.data.query;
  console.log('numQueries = ' + numQueries + ' query = ' + query);
  res.redirect('/');
});

module.exports = router;
