const express = require('express');

const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// var ObjectID = require('mongodb').ObjectID;

var connection = (closure) => {
   return MongoClient.connect('mongodb://localhost:27017/my-first-app', (err, db) => {
        if(err)
        {
            return console.log(err);
        }
        closure(db);
   });
}

let response = {
    status: 200,
    message: null,
    data: []
}

var sendError = (err, res) => {
   response.status = 501,
   response.message = typeof error == "object" ? err.message : err;
   res.status(501).json(response);
}

router.get('/students', (req, res) => {
    connection((db) => {
        // console.log(JSON.stringify(db, undefined, 2));
        db.collection('students').find().toArray().then((students) => {
            response.data = students;
            res.json(response);
        })
    });
    
});

module.exports = router;