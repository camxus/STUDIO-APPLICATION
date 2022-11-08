const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bookings: [
    {
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
      booking_id: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
