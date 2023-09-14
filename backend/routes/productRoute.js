const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
} = require("../controllers/productControllers");
const { isValidID } = require("../middleware/isValidID");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);

router
  .route("/products/:id")
  .get(isValidID, productDetails)
  .put(isValidID, updateProduct)
  .delete(isValidID, deleteProduct);

module.exports = router;
