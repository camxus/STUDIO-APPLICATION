const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bookings: [
    {
      booking_id: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
