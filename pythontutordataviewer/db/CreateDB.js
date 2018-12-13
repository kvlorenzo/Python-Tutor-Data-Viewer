var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/pythonprograms';

MongoClient.connect(url, {useNewUrlParser: true},function(err, db) {
  if (err) {
    throw err;
  }
  console.log('Database successfully created. DB name: "pythonprograms"');
  var dbo = db.db('pythonprograms');
  dbo.createCollection('pairs', function(err, res) {
    if (err) {
      throw err;
    }
    console.log('Collection successfully created. Collection name: "pairs"');
  });
  db.close();
});
