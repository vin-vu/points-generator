const receiptStorage = require("../data/receiptStorage");
const { calculateTotalPoints } = require("../helper/pointsHelper");

exports.createReceipt = (req, res, next) => {
  try {
    const { body, id } = req;
    receiptStorage[id] = body;
    res.send({ id });
  } catch (error) {
    next(error);
  }
};

exports.getPoints = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!receiptStorage.hasOwnProperty(id)) {
      return res.status(404).json("No receipt found fo that id");
    }

    const receipt = receiptStorage[id];
    const points = calculateTotalPoints(receipt);
    res.send({ points });
  } catch (error) {
    next(error);
  }
};
