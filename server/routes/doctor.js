const express = require("express");
const router = express();
const User = require("../models/User");
const auth = require("../middleware/auth");
router.get("/list", auth, async (req, res) => {
  try {
    const doctorList = await User.find({ role: "Doctor" }).exec();
    if (doctorList.length) {
      res.send({ status: true, data: doctorList });
    } else {
      res.send({ status: false, message: "Not Found!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

module.exports = router;
