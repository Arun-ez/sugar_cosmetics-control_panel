import mongoose from "mongoose";

const connect = async () => {

    if (mongoose.connection.readyState) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        throw new Error(error);
    }
}


export { connect }