const express = require("express");
const router = express();
const User = require("../models/User");
const auth = require("../middleware/auth");
router.get("/list", async (req, res) => {
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

router.get("/doctors", async (req, res) => {
  try {
    let query = User.find({ role: "Doctor" });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.countDocuments({ role: "Doctor" });
    const pages = Math.ceil(total / pageSize);
    if (page > pages)
      return res.send({ status: false, message: "No Data Available Here." });
    query = query.skip(skip).limit(pageSize);
    const result = await query;
    res.send({
      status: true,
      count: result.length,
      total,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

router.post("/search", async (req, res) => {
  try {
    const result = await User.find({
      $text: { $search: req.query.str },
    });
    res.send({ status: true, data: result });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

module.exports = router;
