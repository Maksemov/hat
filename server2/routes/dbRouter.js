const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const Game = require('../models/game');

router.get('/persons', (req, res) => {
   Person.find({})
      .then((persons) => {
         res.json(persons);
      })
      .catch((err) => {
         res.status(500).json({ error: err.message });
      });
});

router.get('/games', (req, res) => {
   const token = req.query.token;
   Game.find({ token: token.trim() })
      .then((game) => {
         res.json(game);
      })
      .catch((err) => {
         res.status(500).json({ error: err.message });
      });
});

router.post('/persons', (req, res) => {
   Person
      .insertMany(req.body)
      .then((docs) => {
         res.json(docs);
      })
      .catch((err) => {
         res.status(500).json({ error: err.message });
      });
});

router.post('/games', (req, res) => {
   const game = new Game(req.body);

   game
      .save()
      .then(() => {
         res.json(game);
      })
      .catch((err) => {
         res.status(500).json({ error: err.message });
      });
});

module.exports = router;