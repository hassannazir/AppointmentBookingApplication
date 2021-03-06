const express = require("express");
const router = express();
const User = require("../models/User");
const auth = require("../middleware/auth");
const Appointment = require("../models/Appointment");
const Schedule = require("../models/Schedule");
router.post("/add", auth, async (req, res) => {
  try {
    const appointment = req.body;
    if (appointment) {
      const booking = new Appointment(appointment);
      await booking.save();
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

router.get("/list", auth, async (req, res) => {
  try {
    const apps = await Appointment.find({
      doctorId: req.user._id,
      status: "Pending",
    })
      .populate("patient schedule")
      .exec();
    res.send({ status: true, data: apps });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

router.put("/status", auth, async (req, res) => {
  try {
    const { appId, status } = req.body;
    const result = await Appointment.findOneAndUpdate(
      { _id: appId },
      { status: status }
    ).exec();
    res.send({ status: true, data: result });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

router.get("/approved", auth, async (req, res) => {
  try {
    const result = await Appointment.find({
      patientId: req.user._id,
    })
      .populate("doctor schedule")
      .exec();
    res.send({ status: true, data: result });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

router.get("/doctorBookings", auth, async (req, res) => {
  try {
    const result = await Appointment.find({
      doctorId: req.user._id,
      $or: [{ status: "Approved" }, { status: "Pending" }],
    })
      .populate("patient schedule")
      .exec();
    res.send({ status: true, data: result });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

router.get("/patients", auth, async (req, res) => {
  try {
    const result = await Appointment.find({
      doctorId: req.user._id,
    })
      .populate("patient")
      .exec();
    res.send({ status: true, data: result });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

module.exports = router;
