const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { newOrder } = require("../controllers/orderController");
const router = express.Router();

router.route("/new").post(isAuthenticatedUser, newOrder);

module.exports = router;
