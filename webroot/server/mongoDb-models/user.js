const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  password: String,
  salt: String,
  username: String,
  email: String,
});

module.exports = mongoose.model('User', usersSchema);