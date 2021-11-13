import mongoose from 'mongoose' 
import bcrypt from 'bcrypt'
import {v4 as uuid4} from "uuid"

import serviceSchema from './Service.js'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      default: uuid4()
    },
    msgTemplate: {
      type: String,
      default:"This is a Test Message"
    },
    serviceList: [serviceSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password') || this.isModified('key')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    this.key = uuid4()
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('serviceCount').get(function () {
  return this.serviceList.length;
});

const User = model('User', userSchema);

export default User;
