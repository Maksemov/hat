const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
   playersCount: {
      type: Number,
      required: true
   },
   personsCount: {
      type: Number,
      required: true,
   },
   token: {
      type: String,
      required: true,
      unique: true
   },
   round: {
      type: Number,
      required: true,
   },
});

module.exports =  mongoose.model('Game', gameSchema);