const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   round: {
      type: Number,
      required: true,
   },
   game: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      required: true
   }
});

module.exports = mongoose.model('Person', personSchema);