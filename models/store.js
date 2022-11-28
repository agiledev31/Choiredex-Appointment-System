const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const currentDate = new Date().toISOString();

const storeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  address: String,
  coordinateLat: String,
  coordinateLng: String,
  city: String,
  country: String,
  phone: String,
  email: String,
  website: String,
  timezone: String,
  availableServices: { type: Array, default: [] },
  createdAt: { type: Date, default: currentDate },
});

module.exports = mongoose.model("Store", storeSchema);
