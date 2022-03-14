import "./env.js";
import mongoose from "mongoose";

const { connect, connection } = mongoose;

connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default connection;
