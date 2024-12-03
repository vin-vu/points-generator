const receipts = require("../data/receiptStorage");
const { calculateTotalPoints } = require("../helper/pointsHelper");
const { validationResult } = require("express-validator");

exports.saveReceipt = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("The receipt is invalid");
      error.status = 400;
      error.details = errors.errors;
      return next(error);
    }

    const { body, id } = req;
    receipts[id] = body;
    return res.send({ id });
  } catch (error) {
    return next(error);
  }
};

exports.getPoints = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Object.hasOwn(receipts, id)) {
      const error = new Error();
      error.status = 404;
      error.details = "No receipt found for that id";
      return next(error);
    }

    const receipt = receipts[id];
    const points = calculateTotalPoints(receipt);
    return res.send({ points });
  } catch (error) {
    return next(error);
  }
};
