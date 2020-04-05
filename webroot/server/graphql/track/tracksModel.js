const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const trackSchema = new Schema({
  name: String,
  genre: String,
  userId: String,
}, { versionKey: false });

export default mongoose.model('Tracks', trackSchema);
