const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.get('/persons', (req, res) => {
    Person.find({})
      .then((persons) => {
         res.json(persons);
      })
      .catch((err) => {
         res.status(500).json({error: err.message});
      });
});

router.post('/persons', (req, res) => {
   const person = new Person(req.body);

   person
      .save()
      .then(() => {
         res.json(person);
      })
      .catch((err) => {
         res.status(500).json({error: err.message});
      });
});

module.exports = router;