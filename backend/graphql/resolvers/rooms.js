const Subscripiton = require("../../models/subscription");

const transformRoom = (user) => {
  return {
    ...user._doc,
    _id: user.id.toString(),
  };
};

module.exports = {
  rooms: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("NOT_AUTHENTICATED");
    }

    try {
      const subscriptions = await Subscripiton.find();
      return Array.from(subscriptions).map((sub) => ({
        ...transformRoom(sub),
      }));
    } catch (err) {
      throw err;
    }
  },
};
