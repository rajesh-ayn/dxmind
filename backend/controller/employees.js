const express = require("express");
const Employee = require("../models/employee");
const mongoose = require("mongoose");

// ************** Add New Employee Controller ****************
exports.addEmployee = async (req, res, next) => {
  const employee = new Employee({
    _id: mongoose.Types.ObjectId(),
    photo: req.body.photo,
    status: req.body.status,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    mobile: req.body.mobile,
    age: req.body.age,
    gender: req.body.gender,
    dob: req.body.dob,
    merital_status: req.body.merital_status,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    checkin: req.body.checkin,
    checkout: req.body.checkout,
    address: req.body.address,
  });
  console.log('employee in add empl====>', employee);
  await employee
    .save()
    .then((createdEmployee) => {
      console.log("created product===>", createdEmployee);
      res.status(201).json({
        message: "Employee added successfully",
        employee: {
          employee_created: createdEmployee,
          id: createdEmployee._id,
          status: true,
          type: "GET",
          url: "http://localhost:3000/api/employee/" + createdEmployee._id,
        },
      });
    })
    .catch((err) => {
      console.log("err in add product=", err);
    });
};

// ****************** Employee List Controller **********************
exports.employeeList = async (req, res, next) => {
  const employeeQuery = Employee.find();
  let fetchedEmployees;
  let status_code = res;
  // console.log('status_code===',status_code);
  employeeQuery.then((documents) => {
    (fetchedEmployees = documents),
      res.status(200).json({
        message: "Fetched employee list successfully!",
        employee_list: fetchedEmployees,
        type: "GET",
        url: "http://localhost:3000/api/employee/",
        status: true,
      });
  });
};

// ****************** Delete Employee Controller **********************
exports.deleteEmployee = (req, res, next) => {
  Employee.deleteOne({ _id: req.params.id }).then((result) => {
    console.log("result after update============>", result);
    res.status(200).json({
      message: "Employee deleted successfully!",
      type: "GET",
      url: "http://localhost:3000/api/employee",
      status: true,
    });
  });
};

// ****************** Employee Update Controller **********************
exports.updateEmployee = async (req, res, next) => {
  // debugger;
  console.log("req.params.id======", req.params.id);
  var employee = new Employee({
    //   _id: mongoose.Schema.Types.ObjectId,
    _id: mongoose.Types.ObjectId(),
    // id: req.params._id,
    _id: mongoose.Types.ObjectId(),
    photo: req.body.photo,
    status: req.body.status,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    mobile: req.body.mobile,
    age: req.body.age,
    gender: req.body.gender,
    dob: req.body.dob,
    merital_status: req.body.merital_status,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    checkin: req.body.checkin,
    checkout: req.body.checkout,
    address: req.body.address,
  });
  const _id = req.params.id;
  // let id = req.params._id; 
  await Employee.findByIdAndUpdate(_id, req.body)
    .then((result) => {
      console.log("result called====>", result);
      res.status(200).json({
        message: "Employee updated successfully!",
        updated_employee: employee,
        status: true
      });
      console.log("update res======>>>", employee);
    })
    .catch((err) => {
      console.log("caught err in update product======>", err);
      res.status(500).json({
        message: err.message,
        error: err,
        // url: req.body.url,
      });
    });
};
