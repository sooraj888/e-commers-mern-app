const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    payedAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({ success: true, order });
});

//Get single order --Admin--
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;
  // const order=
  const order = await Order.findById(orderId).populate("user", "email name");
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  return res.json({ success: true, order });
});

//Get All order --Admin--
exports.getAllOrder = catchAsyncErrors(async (req, res, next) => {
  // const order=
  const orders = await Order.find({}).populate("user", "email name");
  if (!orders) {
    return next(new ErrorHandler("Orders not found", 404));
  }
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({ success: true, totalAmount, orders });
});

//Get order --user--
exports.getMyOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "email name"
  );
  if (!orders) {
    return next(new ErrorHandler("Orders not found", 404));
  }
  res.status(200).json({ success: true, orders });
});

//Update Order Status  --Admin--
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler("Order is Already delivered", 400));
  }
  const status = req.body.status;
  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  order.orderStatus = status;
  if (status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();
  if (!order) {
    return new ErrorHandler("Order not found", 404);
  }
  return res.json({ success: true, order });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save();
}

//Update Order Status  --Admin--
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  // order.orderItem;
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await Order.findByIdAndDelete(orderId);

  return res.json({ success: true });
});
