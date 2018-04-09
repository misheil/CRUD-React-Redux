// import express from 'express';
const express = require("express");
// import mongodb from 'mongodb';
const mongoose   = require('mongoose');
const bodyParser   = require('body-parser');
// import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());


function validate(data) {
  let errors = {};
  if (data.title === '') errors.title = "Can't be empty";
  if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0
  return { errors, isValid };
}


const dbUrl = 'mongodb://localhost/crudwithredux';

mongoose.Promise = global.Promise;

mongoose.connect(dbUrl, function(err, db) {

  app.get('/api/games', (req, res) => {
  	// setTimeout(()=>{

db.collection('games').find({}).toArray((err, games) => {
      res.json({ games });
    });

  	// },2000);
    
  });






 app.put('/api/games/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { title, cover } = req.body;
      db.collection('games').findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(req.params._id) },
        { $set: { title, cover } },
        { returnOriginal: false },
        (err, result) => {
          if (err) { res.status(500).json({ errors: { global: err }}); return; }

          res.json({ game: result.value });
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });




 app.get('/api/games/:_id', (req, res) => {
    db.collection('games').findOne({ _id: new mongoose.Types.ObjectId(req.params._id) }, (err, game) => {
      res.json({ game });
    })
  });







app.post('/api/games', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { title, cover } = req.body;
      db.collection('games').insert({ title, cover }, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          res.json({ game: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });



app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: "Still working on it. Please try again later when we implement it"
      }
    });
  })

  app.listen(8080, () => console.log('Server is running on localhost:8080'));

});