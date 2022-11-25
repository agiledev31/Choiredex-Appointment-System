const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const currentDate = new Date().toISOString();

const roleSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  createdAt: { type: Date, default: currentDate },
});

module.exports = mongoose.model("Role", roleSchema);
