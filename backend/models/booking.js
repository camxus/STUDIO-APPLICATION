const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  assotiated_users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
