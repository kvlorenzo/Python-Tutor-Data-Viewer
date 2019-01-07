var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

/**
 * Filters and finds documents in the pythonprograms database based on the query
 * keywords
 * @param {number} numQueries maximum number of documents to display
 * @param {String} query the keyword to filter the documents that we search
 * @callback {function} a function to obtain the data from the database query
 * after the function has been called
 *
 * How to use:
 * Call the function, passing in first two parameters as usual, then for the
 * third argument, pass in a function with one argument. This argument is where
 * the query results will be stored. Then use the function to manipulate the
 * results however you like :)
 *
 * Example:
 * dbQuery(69, "420", function(result) {
 *    console.log(result) // the data should appear here
 *    // You can do whatever you want with result afterwards
 * });
 */
exports.dbQuery = function(numQueries, query, callback) {
  // search limit on number of results to return - default = 20
  numQueries = parseInt(numQueries) || 20;
  console.log("From query: NumQueries = " + numQueries);

  // connect to database
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) {
      throw err;
    }
    var dbo = db.db('pythonprograms');
    
    // Search if we have a valid search query
    if (query && query.length > 0) {
      console.log("Query valid");
      // retrieve data - we will be searching through the "fix" field
      dbo.collection('pairs').find(
        {fix: {$regex: query, $options: "$i"}},
        {projection: {bad: 1, fix: 1}}
      ).limit(numQueries).toArray(function(err, result) {
        if (err) {
          throw err;
        }
        callback(result) // result = array of queried documents
      });
    }
    // if we don't have a valid query, then choose documents at random
    else {
      console.log("Query invalid");
      dbo.collection('pairs').aggregate(
        [{$sample: {size: numQueries}},
         {$project: {_id: 0, bad: 1, fix: 1}}]
      ).limit(numQueries).toArray(function(err, result) {
        if (err) {
          throw err;
        }
        callback(result) // result = array of queried documents
      });
    }
    db.close();
  });
};

