const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderProducts: [
        {
            name:{
                type:String,
                required:[true,"Please enter your product name"],
                trim: true
            },
            price:{
                type:Number,
                required:[true,"Please enter your product price"],
                maxLength:[8,"Price cannot exced 8 characters"]
            },
            quantity:{
                type:Number,
                required:true
            },
            image:[
                {
                    url:{
                        type:String,
                        required:true
                    }
                }
            ],
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
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Orders',orderSchema)