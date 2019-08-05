const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

if (process.env.ENV === "Test") {
  const db = mongoose.connect("mongodb://localhost/vendorAPI_test");
} else {
  const db = mongoose.connect(
    "mongodb://saverscard:O0wlqEGsz9hINTQhnOfsYHyZ98f4IMPRRVIyU8X4poFquBSRfMFjCdPwxCkU1YOKh3BGdFNUAwsaJzQJRYUc5g==@saverscard.documents.azure.com:10250/mean?ssl=true&sslverifycertificate=false",
    {
      useNewUrlParser: true,
      useFindAndModify: false
    }
  );
}

const port = process.env.PORT || 3001;
const Vendor = require("./models/vendorModel");
const User = require("./models/userModel");
const vendorRouter = require("./routes/vendorRouter")(Vendor);
const userRouter = require("./routes/userRouter")(User);
const authRouter = require("./routes/authRouter")(User);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/vendors", vendorRouter);
app.use("/api/users", userRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my SaversCard API");
});

app.server = app.listen(port, () => {
  console.log("Running on port " + port);
});

module.exports = app;
