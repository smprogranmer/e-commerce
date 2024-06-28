const mongoose = require('mongoose');
const { Schema } = mongoose;
const cartschema = new Schema({
  name:{type: 'string', required: true},
  quantity: { type: Number, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  size: { type: Schema.Types.Mixed },
  price: { type: Schema.Types.Mixed },
  stock: { type: Schema.Types.Mixed},
  image:{
    url:{
      type: String,
      required:true
    }
  }
  
});


module.exports = mongoose.models.Carts || mongoose.model('Carts', cartschema);
