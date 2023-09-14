const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorHandler");
exports.isValidID = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Not a valid Id ", 400));
  }
  next();
};
