const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    contact: Number,
    age: Number,
    status: Boolean,
    role: String,
    address: String,
    licenseNumber: String,
    speciality: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
