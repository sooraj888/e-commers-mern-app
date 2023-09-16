const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");

//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

exports.productDetails = catchAsyncErrors(async (req, res, next) => {
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

exports.updateProduct = catchAsyncErrors(async (req, res) => {
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

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
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
