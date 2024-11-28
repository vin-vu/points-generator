const receipts = require("../data/receiptStorage");
const { calculateTotalPoints } = require("../helper/pointsHelper");

exports.saveReceipt = (req, res, next) => {
  try {
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

    if (!receipts.hasOwnProperty(id)) {
      return res.status(404).json("No receipt found for that id");
    }

    const receipt = receipts[id];
    const points = calculateTotalPoints(receipt);
    return res.send({ points });
  } catch (error) {
    return next(error);
  }
};
