const express = require("express");
const router = express();
const User = require("../models/User");
const auth = require("../middleware/auth");
router.get("/list", auth, async (req, res) => {
  try {
    const patientList = await User.find({ role: "Patient" }).exec();
    if (patientList.length) {
      res.send({ status: true, data: patientList });
    } else {
      res.send({ status: false, message: "Not Found!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

module.exports = router;
