import { AuthenticationError } from "apollo-server-errors";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addMsgTemplate: async (parent, { template }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: { msgTemplate: template },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    saveService: async (parent, { ...ServiceInput }, context) => {
      const service = ServiceInput.service;
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        const serviceFound = user.serviceList.find(({serviceNumber}) => serviceNumber === service.serviceNumber)
        if (!user.serviceList || !serviceFound) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { serviceList: { ...service } } },
            { new: true, runValidators: true }
          );
        }
        throw new Error("Number already exists");
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeService: async (parent, { serviceNumber }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { serviceList: { serviceNumber } } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

export default resolvers;
