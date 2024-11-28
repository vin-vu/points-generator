const receipts = require("../data/receiptStorage");
const { calculateTotalPoints } = require("../helper/pointsHelper");

exports.saveReceipt = (req, res, next) => {
  try {
    const { body, id } = req;
    receipts[id] = body;
    res.send({ id });
  } catch (error) {
    next(error);
  }
};

exports.getPoints = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!receipts.hasOwnProperty(id)) {
      return res.status(404).json("No receipt found fo that id");
    }

    const receipt = receipts[id];
    const points = calculateTotalPoints(receipt);
    res.send({ points });
  } catch (error) {
    next(error);
  }
};
