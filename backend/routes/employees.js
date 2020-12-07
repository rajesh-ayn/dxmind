const express = require("express");

const employeeController = require("../controller/employees");
const cors = require("cors");
const router = express.Router();

// ********************* Add Employee Controller **********************
router.post("",cors(), employeeController.addEmployee);

// ********************* Employee List Controller **********************
router.get("", employeeController.employeeList);

router.put("/:id", employeeController.updateEmployee);

// ******************** Delete Employee controller ***********************
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
