const { body } = require("express-validator");

const validateReceipt = [
  body("retailer")
    .isString()
    .matches(/^[\w\s\-\&]+$/)
    .withMessage("Retailer must be a valid alphanumeric string"),

  body("purchaseDate")
    .isString()
    .isISO8601()
    .withMessage("Purchase date must be a valid date string"),

  body("purchaseTime")
    .isString()
    .matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
    .withMessage(
      "Purchase time must be a valid time in 24-hour format (HH:MM)"
    ),

  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be an array with at least one item")
    .custom((items) =>
      items.every((item) => item.shortDescription && item.price)
    )
    .withMessage("Each item must have a name and price"),

  body("total")
    .isString()
    .matches(/^\d+\.\d{2}$/)
    .withMessage(
      "Total must be a valid number with two decimal places (e.g., 6.49)"
    ),
];

module.exports = validateReceipt;
