const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  seats: {
    type: String,
    required: true,
  },
  doors: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  forSale: {
    type: Boolean,
    default: true,
  }
});

module.exports = Car = mongoose.model("cars", CarSchema);
