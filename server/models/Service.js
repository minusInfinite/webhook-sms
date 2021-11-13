import mongoose from 'mongoose'

const { Schema } = mongoose

const serviceSchema = new Schema({
    serviceNumber: {
      type: String,
      required: true,
      unique: true
    },
    lastMessage: {
        type: String,
        default: ""
    },
    lastStatus: {
        type: String,
        default: ""
    },
    messageCount: {
        type: Number,
        default: 0
    },
    usageCost: {
        type: Number,
        default: 0.000
    }
  });
  
  
  export default serviceSchema;