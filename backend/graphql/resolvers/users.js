const User = require("../../models/user");
const Subscripiton = require("../../models/subscription");

const transformUser = (user) => {
  return {
    ...user._doc,
    _id: user.id.toString(),
  };
};

module.exports = {
  me: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("NOT_AUTHENTICATED");
    }

    try {
      const user = await User.findById(req.userId);
      return {
        ...transformUser(user),
        slots: Array.from(user.slots).map((slot) => {
          return {
            ...slot,
            slotId: slot.slotId.toString(),
          };
        }),
      };
    } catch (err) {
      throw err;
    }
  },

  user: async (args, req) => {
    try {
      const user =
        (await User.findOne({ "username": args.username })) ??
        (await User.findOne({ email: args.username }));

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      return {
        ...transformUser(user),
      };
    } catch (err) {
      throw err;
    }
  },

  userById: async (args, req) => {
    try {
      const user = await User.findById(args.ID);

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      return {
        ...transformUser(user),
      };
    } catch (err) {
      throw err;
    }
  },

  deactivateUser: async (args, req) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      user["deactivated"] = true;

      user.save();

      return "deativated";
    } catch (err) {
      throw err;
    }
  },

  deleteUser: async (args, req) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      await User.deleteById(user._doc._id);

      return "deleted";
    } catch (err) {
      throw err;
    }
  },

  addCredits: async (args, req) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      user.attributes["credits"] += args.amount

      user.save();

      return {
        ...transformUser(user)
      };
    } catch (err) {
      throw err;
    }
  },

  changeSubscription: async (args, req) => {
    try {
      const user = await User.findById(req.userId);
      const subscription = await Subscripiton.findById(args.subscription_id);

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      if (!subscription) {
        throw new Error("SUBSCRIPITON_NOT_FOUND");
      }

      user.attributes["subscription_id"] = args.subscription_id

      user.save();

      return {
        ...transformUser(user)
      };
    } catch (err) {
      throw err;
    }
  },
};
