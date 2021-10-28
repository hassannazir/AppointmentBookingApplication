const express = require("express");
const router = express();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("", async (req, res) => {
  const user = req.body;

  try {
    const loggedInUser = await User.find({
      email: user.email,
    });
    if (loggedInUser.length) {
      try {
        var isVerify = await bcrypt.compare(
          user.password,
          loggedInUser[0].password
        );
      } catch (error) {
        return res.send({ status: false, message: error.message });
      }
      if (isVerify) {
        return res.send({
          status: true,
          message: "Logged In Successfully",
          data: loggedInUser,
        });
      } else {
        return res.send({
          status: false,
          message: "Incorrect Password!",
        });
      }
    } else
      return res.send({
        status: false,
        message: "Email does not exists!",
      });
  } catch (error) {
    return res.send({ status: false, message: error.message });
  }
});

module.exports = router;
