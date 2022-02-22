import { AuthenticationError } from "apollo-server-errors";
import User from "../models/User.js";
import ServiceList from "../models/ServiceList.js";
import { signToken } from "../utils/auth.js";

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id)
          .populate("serviceList")
          .populate("serviceListCount");
      }
      throw new AuthenticationError("You need to be logged in");
    },
    listUsers: async (parent, args, context) => {
      if (context.user.isadmin) {
        return await User.find()
          .populate("serviceList")
          .populate("serviceListCount");
      }
      throw new AuthenticationError("You need to be an Admin");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    makeAdmin: async (parent, { username }, context) => {
      if (context.user.isadmin) {
        const user = await User.findOne({ username: username });
        user.isadmin = true;

        return user;
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })
        .populate("serviceList")
        .populate("serviceListCount");

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
    addServiceList: async (parent, args, context) => {
      if (context.user) {
        await ServiceList.create({ user: context.user._id });
        return await User.findById(context.user._id)
          .populate("serviceList")
          .populate("serviceListCount");
      }
      throw new AuthenticationError("You need to be logged in");
    },
    saveServiceList: async (parent, args, context) => {
      if (context.user) {
        const serviceList = ServiceList.findOne({
          _id: args.listId,
          user: context.user._id,
        });
        if (args.changeKey) {
          serviceList.key = "";
          await serviceList.save();
        }
        if (args.template) {
          serviceList.msgTemplate = args.template;
          await serviceList.save();
        }
        return await User.findById(context.user._id)
          .populate("serviceList")
          .populate("serviceListCount");
      }
      throw new AuthenticationError("You need to be logged in");
    },
    saveService: async (parent, { listId, serviceNumber }, context) => {
      const service = serviceNumber;
      if (context.user) {
        const serviceList = await ServiceList.findOne({
          _id: listId,
          user: context.user._id,
        });
        const serviceFound = serviceList.serviceList.find(
          ({ serviceNumber }) => serviceNumber === service
        );
        if (!serviceList.services || !serviceFound) {
          await ServiceList.findOneAndUpdate(
            { _id: listId, user: context.user._id },
            {
              $addToSet: {
                services: { serviceNumber: service },
              },
            },
            { new: true, runValidators: true }
          );
          return await User.findById(context.user._id)
            .populate("serviceList")
            .populate("serviceListCount");
        }
        throw new Error("Number already exists");
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeService: async (parent, { listId, serviceNumber }, context) => {
      if (context.user) {
        await ServiceList.findOneAndUpdate(
          { _id: listId, user: context.user },
          { $pull: { services: { serviceNumber } } },
          { new: true }
        );
        return await User.findById(context.user._id)
          .populate("serviceList")
          .populate("serviceListCount");
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

export default resolvers;
