const express = require("express");
const router = express();
const User = require("../models/User");

router.post("", async (req, res) => {
  const user = req.body;
  if (user) {
    try {
      const isAlreadyExists = await User.findOne({ email: user.email });
      if (isAlreadyExists)
        return res.send({ status: false, message: "Email is already Exists!" });
    } catch (error) {
      res.send({ status: false, message: error.message });
    }

    if (user.role === "Patient") {
      delete user.speciality;
      delete user.licenseNumber;
    }
    var newUser = new User({
      ...user,
    });
  } else res.send({ status: false, message: "Object is Empty!" });

  try {
    await newUser.save();
    res.send({
      status: true,
      message: "Successfully Registered!",
      data: newUser,
    });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

module.exports = router;
