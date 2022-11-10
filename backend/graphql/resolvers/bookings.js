const Booking = require("../../models/booking");

const transformBooking = (user) => {
  return {
    ...user._doc,
    _id: user.id.toString(),
  };
};

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("NOT_AUTHENTICATED");
    }

    try {
      const booking = await Booking.findOne({ created_by: req.userId });
      return {
        ...booking._doc,
        _id: booking.id.toString(),
        associated_users: Array.from(booking.associated_users).map((id) =>
          id.toString()
        ),
      };
    } catch (err) {
      throw err;
    }
  },

  bookingsByDate: async (args, req) => {
    try {
      const date = +new Date(args.date).setHours(0, 0, 0);
      const end = +new Date(args.date).setHours(23, 59, 59);

      const bookings = await Booking.find({
        from: { $gt: date, $lt: end },
      });

      if (!bookings) {
        return null;
      }

      return bookings.map((booking) => ({
        ...transformBooking(booking),
      }));
    } catch (err) {
      throw err;
    }
  },

  createBooking: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("NOT_AUTHENTICATED");
      }

      const booking = await new Booking({
        created_by: args.bookingInput.created_by,
        associated_users: args.bookingInput.associated_users ?? [],
        from: args.bookingInput.from,
        to: args.bookingInput.to,
      });

      const result = await booking.save();

      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  },

  removeBooking: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("NOT_AUTHENTICATED");
      }

      const booking = await Booking.findById(args.booking_id);

      if (!booking) {
        throw new Error("BOOKING_NOT_FOUND");
      }
      await Booking.deleteById(booking._doc._id);

      return "removed";
    } catch (err) {
      throw err;
    }
  },
};
