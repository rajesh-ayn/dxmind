const express = require("express");

const Product = require("../models/product");
const mongoose = require("mongoose");

// ************** Add New Product Controller ****************
exports.addProduct = async (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    product_name: req.body.product_name,
    price: req.body.price,
    profit_margin: req.body.profit_margin,
    sku: req.body.sku,
    description: req.body.description,
  });

  await product
    .save()
    .then((createdProduct) => {
      console.log("created product===>", createdProduct);
      res.status(201).json({
        message: "Product added successfully",
        product: {
          ...createdProduct,
          id: createdProduct._id,
        },
      });
    })
    .catch((err) => {
      console.log("err in add product=", err);
    });
};

// ****************** Product List Controller **********************
exports.productList = async (req, res, next) => {
  const productQuery = Product.find();
  let fetchedProducts;
  productQuery
    .then((documents) => {
      fetchedProducts = documents;
    })
    .then((count) => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products: fetchedProducts,
      });
    });
};

// ****************** Product Update Controller **********************
exports.updateProduct = async (req, res, next) => {
  // debugger;
  console.log("req.params.id======", req.params.id);
  var product = new Product({
    //   _id: mongoose.Schema.Types.ObjectId,
    _id: mongoose.Types.ObjectId(),
    // id: req.params._id,
    product_name: req.body.product_name,
    price: req.body.price,
    profit_margin: req.body.profit_margin,
    sku: req.body.sku,
    description: req.body.description,
  });
  const _id = req.params.id;
  // let id = req.params._id;
  // console.log("update put method called====>", product);
  await Product.findByIdAndUpdate(_id, req.body)
    .then((result) => {
      console.log("result called====>", result);
      res.status(200).json({
        message: "Product updated successfully!",
        updated_product: product,
      });
      console.log("update res======>>>", product);
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

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then((result) => {
    console.log("result after update============>", result);
    res.status(200).json({ message: "Product deleted successfully!" });
  });
};
