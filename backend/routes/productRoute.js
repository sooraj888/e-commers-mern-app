const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
} = require("../controllers/productControllers");
const { isValidID } = require("../middleware/isValidID");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/products/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);

router
  .route("/products/:id")
  .get(isValidID, productDetails)
  .put(isValidID, isAuthenticatedUser, authorizeRole("admin"), updateProduct)
  .delete(
    isValidID,
    isAuthenticatedUser,
    authorizeRole("admin"),
    deleteProduct
  );

module.exports = router;
