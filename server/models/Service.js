import mongoose from 'mongoose' 

const { Schema} = mongoose

const serviceSchema = new Schema({
    serviceNumber: {
      type: String,
      required: true,
      unique: true
    },
    lastMessage: {
        type: String
    },
    lastStatus: {
        type: Boolean
    },
    messageCount: {
        type: Number
    },
    usageCost: {
        type: Number
    }
  });
  
  export default serviceSchema;