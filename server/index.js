const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to wHealth App.");
});

//Set up mongoose connection
var mongoDB = config.mongodbURI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
