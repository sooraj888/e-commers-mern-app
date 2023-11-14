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
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  let apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
  let apiFeatureCount = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeatureCount.query;
  let sortedProductCount = products.length;
  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
    sortedProductCount,
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

// Create new Review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  // console.log(req.user._id);
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user?.toString() == req.user._id
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user?.toString() == req.user._id?.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += Number(rev.rating);
  });

  product.ratings = Number(avg) / Number(product.reviews.length);

  // console.log()
  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  res.json({
    success: true,
    reviews: { rating: product.ratings, review: product.reviews },
  });
});

exports.reviewDelete = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const reviewId = req.query.reviewId;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  if (!reviewId) {
    return next(new ErrorHandler("reviewId is required"));
  }

  const isReviewed = product.reviews.find((rev) => {
    return rev._id.toString() === reviewId;
  });

  if (!isReviewed) {
    return next(new ErrorHandler("Review not not found"));
  }

  const reviews = product.reviews.filter((rev) => {
    return rev._id.toString() !== reviewId;
  });

  product.reviews = reviews;
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += Number(rev.rating);
  });

  product.ratings = Number(Number(avg) / Number(product.reviews.length) || 0);

  product.numOfReviews = product.reviews.length;

  await product.save({ validateBeforeSave: true });

  res.json({
    success: true,
  });
});
