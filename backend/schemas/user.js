const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    _id: { type: String, default: "" },
    password: { type: String, default: "" },
    accessToken: { type: String, default: "" },
    active: { type: Boolean, default: false },
    verification_token: { type: String, default: "" },
    games: { type: Array, default: [] },
    events: { type: Array, default: [] },
  },
  { timestamps: { createdAt: "created_date", updatedAt: "updated_date" } },
  { usePushEach: true }
);

module.exports = mongoose.model("User", UserSchema);
