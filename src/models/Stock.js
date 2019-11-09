const mongoose = require("mongoose");

const StocksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  atualPrice: {
    type: Number,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  diff: {
    type: Number,
    required: true
  },
  closeYesterday: {
    type: Number,
    required: true
  },
  purchasePrice: {
    type: Number
  },
  quantity: {
    type: Number,
    required: true
  },
  dayChange: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Stock", StocksSchema);
