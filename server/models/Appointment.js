const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema(
  {
    patientId: String,
    scheduleId: String,
    doctorId: String,
    status: String,
    patient: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],
    doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
