import { AuthenticationError } from "apollo-server-errors";
import User from "../models/User.js";
import ServiceList from "../models/ServiceList.js";
import { signToken } from "../utils/auth.js";
import { v4 as uuidv4 } from "uuid";

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
    makeAdmin: async (parent, { username }, context) => {
      let id = uuidv4();
      if (!context.user.isadmin) {
        const user = await User.findOne({ username: username });
        user.isadmin = true;

        return { id: id, success: true };
      }
      return { id: id, success: false };
    },
    addServiceList: async (parent, { listName }, context) => {
      let id = uuidv4();
      if (context.user) {
        console.log(listName);
        const serviceList = await ServiceList.create({
          user: context.user._id,
          name: listName,
        });
        if (serviceList) {
          return { id: id, success: true };
        }
        return { id: id, success: false };
      }
      throw new AuthenticationError("You need to be logged in");
    },
    saveServiceList: async (parent, args, context) => {
      let id = uuidv4();
      if (context.user) {
        const serviceList = await ServiceList.findOne({
          _id: args.listId,
          user: context.user._id,
        });
        if (!serviceList) {
          return { id: id, success: false };
        }
        if (args.changeKey) {
          serviceList.key = "";
          await serviceList.save();
        }
        if (args.newName) {
          serviceList.name = args.newName;
          await serviceList.save();
        }
        if (args.template) {
          serviceList.msgTemplate = args.template;
          await serviceList.save();
        }
        return { id: id, success: true };
      }
      throw new AuthenticationError("You need to be logged in");
    },
    addService: async (parent, { listId, serviceNumber }, context) => {
      let id = uuidv4();
      const service = serviceNumber;
      if (context.user) {
        const serviceList = await ServiceList.findOne({
          _id: listId,
          user: context.user._id,
        });
        if (!serviceList) {
          return { id: id, success: false };
        }
        const serviceFound = serviceList.services.find(
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
          return { id: id, success: true };
        }
        throw new Error("Number already exists");
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeService: async (parent, { listId, serviceNumber }, context) => {
      let id = uuidv4();
      if (context.user) {
        const serviceList = await ServiceList.findOneAndUpdate(
          { _id: listId, user: context.user },
          { $pull: { services: { serviceNumber } } },
          { new: true }
        );
        if (serviceList) {
          return { id: id, success: true };
        }
        return { id: id, success: false };
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeServiceList: async (parent, { listId }, context) => {
      let id = uuidv4();
      if (context.user) {
        const serviceList = await ServiceList.findOneAndDelete({
          _id: listId,
          user: context.user,
        });
        if (serviceList) {
          return { id: id, success: true };
        }
        return { id: id, success: false };
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

export default resolvers;
