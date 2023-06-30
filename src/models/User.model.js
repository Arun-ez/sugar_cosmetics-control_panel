import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    cart: {
        type: Array,
        default: []
    },

    wishlist: {
        type: Array,
        default: []
    },

    auth_type: {
        type: String
    },

    addresses: {
        type: Array,
        default: []
    }
})

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export { User }