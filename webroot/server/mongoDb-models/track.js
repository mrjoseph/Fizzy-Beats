const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tracksSchema = new Schema({
  name: String,
  genre: String,
  userId: String,
}, { versionKey: false });

export default mongoose.model('tracks', tracksSchema);
