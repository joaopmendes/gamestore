require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const path = require("path");
const app = express();
const passport = require("passport");

app.use(passport.initialize());
require("./PassportStrategies/google")(passport);
// Public Folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(require("morgan")("combined"));
app.use("/api", routes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

mongoose
  .connect(process.env.MONGOOSE_URL, { useNewUrlParser: true })
  .then((ok) => console.log("Connected to db"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 4000);
