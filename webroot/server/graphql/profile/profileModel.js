const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  password: String,
  salt: String,
  username: String,
  email: String,
  profileImage: String,
}, { versionKey: false });

export default mongoose.model('User', usersSchema);
