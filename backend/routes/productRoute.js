const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  createProductReview,
  getAllReviews,
  reviewDelete,
} = require("../controllers/productControllers");
const { isValidID } = require("../middleware/isValidID");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);

router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router
  .route("/products/:id")
  .get(productDetails)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/review/:id")
  .get(getAllReviews)
  .delete(isAuthenticatedUser, reviewDelete);

module.exports = router;
