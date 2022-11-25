const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const currentDate = new Date().toISOString();

const serviceSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    duration: Number,
    description: String,
    createdAt: { type: Date, default: currentDate },
});

module.exports = mongoose.model("Service", serviceSchema);