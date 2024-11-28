const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("The receipt is invalid");
    error.status = 400;
    error.details = errors.errors;
    console.log('error: ', error.message)
    return next(error);
  }
  return next();
};

module.exports = handleValidationErrors;
