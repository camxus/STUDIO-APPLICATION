const mongoose = require("mongoose");

const Schema = mongoose.Schema;

function pronounsLimit(val) {
  return val.length < 3;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  attributes: {
    username: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    subscription_status: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
      required: false,
    },
    credits: {
      type: Number,
      default: 0,
      required: true,
    },
    birthdate: {
      type: Date,
      required: false,
    },
  },
  slots: [
    {
      slot_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  keys: [
    {
      door_name: {
        type: String,
      },
      owner_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      temporary_password: {
        type: String,
        required: true,
      },
      exp_date: {
        type: Date,
        required: true,
      },
    },
  ],
  deactivated: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
