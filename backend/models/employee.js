const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  _id: { type: String },
  photo: { type: String },
  status: { type: Boolean },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  mobile: { type: Number },
  age: { type: String },
  gender: { type: String },
  merital_status: { type: String },
  dob: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  checkin: { type: String },
  checkout: { type: String },
  address: { type: String },
});

module.exports = mongoose.model("Employee", employeeSchema);
