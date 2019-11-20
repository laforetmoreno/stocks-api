const mongoose = require("mongoose");

const StocksSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  atualPrice: {
    type: Number,
  },
  symbol: {
    type: String,
  },
  diff: {
    type: Number,
  },
  closeYesterday: {
    type: Number,
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  dayChange: {
    type: Number,
  },
  occupationArea: {
    type: String,
  }
});

module.exports = mongoose.model("Stock", StocksSchema);
