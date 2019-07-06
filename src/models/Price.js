const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Price", PriceSchema);
