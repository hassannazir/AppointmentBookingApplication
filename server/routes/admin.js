const express = require("express");
const router = express();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.put("/changeUserStatus", async (req, res) => {
  try {
    const { id, status } = req.query;
    const result = await User.findOneAndUpdate(
      { _id: id },
      { status: status }
    ).exec();
    res.send({ status: true, data: result });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

module.exports = router;
