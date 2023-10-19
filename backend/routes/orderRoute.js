const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  getAllOrder,
  getMyOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/orders/new").post(isAuthenticatedUser, newOrder);

router.route("/orders/my").get(isAuthenticatedUser, getMyOrder);

router
  .route("/orders/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleOrder);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllOrder);

router
  .route("/admin/orders/:id")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteOrder)
  .put(isAuthenticatedUser, authorizeRole("admin"), updateOrderStatus);

module.exports = router;
