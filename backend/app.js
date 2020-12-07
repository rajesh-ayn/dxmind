const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const employeeRoutes = require("./routes/employees");

const app = express();

mongoose.connect("mongodb://localhost:27017/dxmind_db", (err) => {
  if (!err) {
    console.log("Connection Successfull");
  } else {
    console.log("Error in DB Connection :" + JSON.stringify(err, undefined, 2));
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

// app.use("/signup", signupUser);
app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

module.exports = app;
