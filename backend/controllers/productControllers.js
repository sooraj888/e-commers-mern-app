const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");
const catchHandler = require("../middleware/catchAsyncErrors");

//Create Product -- Admin
exports.createProduct = catchHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

exports.productDetails = catchHandler(async (req, res, next) => {
  const id = req.params.id;

  let product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchHandler(async (req, res) => {
  const id = req.params.id;

  const data = req.body;

  let product = await Product.findById(id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }

  product = await Product.findByIdAndUpdate({ _id: id }, data, {
    new: true,
    runValidator: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }

  await Product.findByIdAndDelete({ _id: id });

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});
