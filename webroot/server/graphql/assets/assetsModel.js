const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetsSchema = new Schema({
  file: Object,
  userId: String,
  status: String,
}, { versionKey: false });

export default mongoose.model('Assets', assetsSchema);
