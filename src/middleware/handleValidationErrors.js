const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json("The receipt is invalid");
  }
  next();
};

module.exports = handleValidationErrors;
