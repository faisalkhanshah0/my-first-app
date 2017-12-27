const express = require('express');

const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// var ObjectID = require('mongodb').ObjectID;
// mongodb://localhost:27017/my-first-app
// mongodb://heroku_r5tjm0j6:qardrb1tt0j5skilbhuhmgbd0c@ds133657.mlab.com:33657/heroku_r5tjm0j6
var connection = (closure) => {
   return MongoClient.connect('mongodb://heroku_r5tjm0j6:qardrb1tt0j5skilbhuhmgbd0c@ds133657.mlab.com:33657/heroku_r5tjm0j6', (err, db) => {
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