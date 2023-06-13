const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   userId: {
      type: String,
      required: true,
      unique: true
   },
   name: {
      type: String,
      required: true
   },
   persons: {
      type: String,
      required: true,
      unique: true
   },
});

const User = mongoose.model('User', userSchema);