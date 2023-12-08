const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const asyncHandler = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const stripe = require("stripe")(
  "sk_test_51OJBEeSAeDrCcC40Gblik5SYqT0vXD6UMyX8G2fBGQXEHW5InCJEkTQ9LgQht61EfVn8i0Oo019hS4cBlnvjtXYa00lXtooAYY"
);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.amount) {
    return next(ErrorHandler("amount is required", 400));
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(req.body.amount),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res
    .status(200)
    .json({ success: true, clientSecret: paymentIntent?.client_secret });
});

exports.getPaymentApiKey = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, stripApiKey: process.env.STRIP_API_KEY });
});
