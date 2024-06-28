const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model:{
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  qnt: {
    type: Number,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.models.products || mongoose.model('products', productSchema);
