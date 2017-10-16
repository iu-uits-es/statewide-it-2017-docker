const express  = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const path = require('path');

const app = express();
let db;

app.use(require('body-parser').json());
app.use(express.static(__dirname + '/../build'));

app.get("/todos", function(req, res) {
  db.collection('todos').find().toArray((error, results) => {
    if(error) {
      res.send(error);
    } else {
      res.json(results);
    }
  });
});

app.post("/todos", (req, res) => {
  let todo = req.body;
  todo.done = false
  db.collection('todos').insertOne(todo, (error, result) =>{
    if(error) {
      res.send(error);
    } else {
      res.send(result.ops[0]);
    }
  });
});

app.patch("/todos/:todoId", function(req, res) {
  db.collection('todos').updateOne({ _id: new ObjectId(req.params.todoId) }, { $set: req.body }, null, (error, result) => {
    if(error) {
      res.send(error);
    } else {
      res.status(204).send();
    }
  });
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

MongoClient.connect('mongodb://localhost:27017/todoapp', (err, database) => {
  db = database;
  app.listen(3000, function(err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at http://localhost:3000');
  });
});
