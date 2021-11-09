const mongoose = require("mongoose");

const ScheduleSchema = mongoose.Schema(
  {
    doctorId: String,
    startDate: Date,
    endDate: Date,
    startTime: String,
    endTime: String,
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
