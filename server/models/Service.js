import mongoose from "mongoose";

const { Schema } = mongoose;

const serviceSchema = new Schema({
  serviceNumber: {
    type: String,
    required: true,
    match: [/\+\d+/, "Must use a valid phone number"],
  },
  lastMessage: {
    type: String,
    default: "",
  },
  lastStatus: {
    type: String,
    default: "NEW",
  },
  messageCount: {
    type: Number,
    default: 0,
  },
});

export default serviceSchema;
