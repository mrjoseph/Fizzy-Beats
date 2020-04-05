const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
  file: Object,
  userId: String,
  status: String,
}, { versionKey: false });

export default mongoose.model('Images', imagesSchema);
