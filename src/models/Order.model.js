import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({

    order_id: {
        type: String,
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    products: {
        type: Array,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    ordered_on: {
        type: String,
        required: true
    },

    delivered_on: {
        type: String,
        required: true,
    },

    status: {
        type: Number,
        default: 0
    },

    address: {
        type: Object,
        required: true
    }

}, { timestamps: true })


const Order = mongoose.models.orders || mongoose.model('orders', OrderSchema);

export { Order }