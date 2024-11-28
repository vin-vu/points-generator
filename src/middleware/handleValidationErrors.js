const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    const error = new Error("The receipt is invalid");
    error.status = 404;
    error.details = errors.errors;
    error.message = errors.errors[0].msg;
    return next(error);
  }
  next();
};

module.exports = handleValidationErrors;
