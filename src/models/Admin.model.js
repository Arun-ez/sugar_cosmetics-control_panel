import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    userid: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

const Admin = mongoose.models.admins || mongoose.model('admins', AdminSchema);

export { Admin }