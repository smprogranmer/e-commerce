const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderProducts: [
        {
            type:mongoose.Schema.ObjectId,
            ref:"Carts",
            required:true
        }
    ],
    totalPrice:{
        type:Number,
        required:[true,"Please enter your total price"],
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"Users",
        required:true,
    },
    shippingDetails: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
      },
},
{
    timestamps:true
    
})

module.exports = mongoose.model('Orders',orderSchema)