const express = require("express");

const productController = require("../controller/products");

const router = express.Router();

// ********************* Add Product Controller **********************
router.post("", productController.addProduct);

// ********************* Product List Controller **********************
router.get("", productController.productList);

router.put("/:id", productController.updateProduct);

// ******************** Delete Product controller ***********************
router.delete("/:id", productController.deleteProduct);

module.exports = router;
