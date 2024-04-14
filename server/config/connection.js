import "./env.js";
import mongoose from "mongoose";

const { connect, connection } = mongoose;

connect(process.env.MONGODB_URI);

mongoose.set("strictQuery", false)

export default connection;
