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
  usageCost: {
    type: Number,
    default: 0.0,
  },
});

serviceSchema.pre("save", function (next) {
  if (this.isModified("usageCost")) {
    this.usageCost = this.usageCost.toFixed(3);
  }
  next();
});

export default serviceSchema;
