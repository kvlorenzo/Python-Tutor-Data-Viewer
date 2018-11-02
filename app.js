// The directory name to the data sets
const DATA_DIR = './data/pairs/';

// The port number to the backend server
const PORT = 3000;

// The host of the server
const IP_SERVER = '127.0.0.1';

// module to create the http server
var http = require('http');

// module to read selected files
var fs = require('fs');

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



/*
 * TODO: Get requests for number of queries
 * Read in the random files
 * Send the json objects to the front end
 * Display the good and bad code on front end
 * prettify the webs page
 * add diff to html
 */

var server = http.createServer(function(req, res) {
  console.log('request was made: ' + req.url);
  res.writeHead(200, {'Content-Type': 'application/json'});
  var myObj = {
    name: 'Kyle',
    age: 17
  };
  var fileArr = getRandomFiles(5, DATA_DIR);
  res.end(fileArr.toString());
});

server.listen(PORT, IP_SERVER);
console.log('Listening on port ' + PORT);
