const express = require("express");
const route = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  processPayment,
  getPaymentApiKey,
} = require("../controllers/paymentController");

route.route("/payment/process").post(isAuthenticatedUser, processPayment);
route.route("/payment/apiKey").get(isAuthenticatedUser, getPaymentApiKey);
module.exports = route;
