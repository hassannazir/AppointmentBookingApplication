const express = require("express");
const router = express();
const User = require("../models/User");

router.post("", async (req, res) => {
  const user = req.body;

  try {
    const loggedInUser = await User.find({
      email: user.email,
      password: user.password,
    });
    if (loggedInUser.length) {
      return res.send({
        status: true,
        message: "Logged In Successfully",
        data: loggedInUser,
      });
    } else
      return res.send({
        status: false,
        message: "Incorrect Email or Password!",
      });
  } catch (error) {
    return res.send({ status: false, message: "User not Found!" });
  }
});

module.exports = router;
