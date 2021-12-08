const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
const parserForm = express.json({ extended: false });
app.use(parserForm);
const csrfProtection = csurf({ cookie: true });

app.get("/", (req, res) => {
  res.send("Welcome to wHealth App.");
});

app.get("/form", csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.send({ csrfToken: req.csrfToken() });
});

app.post("/process", parserForm, csrfProtection, function (req, res) {
  console.log("HI");
  res.send({ status: true, message: "data is being processed" });
});

//Set up mongoose connection
var mongoDB = config.get("mongodbURI");
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/doctor", require("./routes/doctor"));
app.use("/patient", require("./routes/patient"));
app.use("/schedule", auth, csrfProtection, require("./routes/schedule"));
app.use("/appointment", require("./routes/appointment"));
app.use("/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
