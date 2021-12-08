const express = require("express");
const router = express();
const Schedule = require("../models/Schedule");
const auth = require("../middleware/auth");
router.post("/get", async (req, res) => {
  try {
    const id = req.body.id;
    const scheduleList = await Schedule.find({
      doctorId: id,
    })
      .sort({
        createdAt: -1,
      })
      .exec();
    if (scheduleList.length) {
      res.send({ status: true, data: scheduleList });
    } else {
      res.send({ status: false, message: "Not Found!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newSchedule = req.body;
    if (newSchedule) {
      const schedule = new Schedule({ ...newSchedule, doctorId: req.user._id });
      const result = await schedule.save();
      res.send({ status: true, message: "Successfully Added!", data: result });
    } else {
      res.send({ status: false, message: "Empty Object!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

module.exports = router;
