const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
