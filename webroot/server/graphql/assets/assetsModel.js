const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetsSchema = new Schema({
  files: Object,
  userId: String,
}, { versionKey: false });

export default mongoose.model('Assets', assetsSchema);
