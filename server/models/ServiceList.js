import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid";

import serviceSchema from "./Service.js";

const { Schema, model } = mongoose;

const serviceListSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    key: {
      type: String,
      default: uuid4(),
    },
    msgTemplate: {
      type: String,
      default: "This is a Test Message",
    },
    usageCost: {
      type: "Number",
      default: 0.0,
    },
    services: [serviceSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

serviceListSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("key")) {
    this.key = uuid4();
  }
  next();
});

serviceListSchema.virtual("serviceCount").get(function () {
  return this.services.length;
});

const ServiceList = model("ServiceList", serviceListSchema);

export default ServiceList;
