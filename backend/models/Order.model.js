const mongoose = require("mongoose");

// create order schema

const OrderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },

    products : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

            quantity : {
                type : Number,
                default: 1
            }
        }
    ],

    totalAmount : {
        type : Number,
        required : true
    },

    bill_Id : {
        type : String,
    }


}, { timestamps : true });

module.exports = mongoose.model("Order", OrderSchema)