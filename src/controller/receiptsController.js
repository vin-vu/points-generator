const receiptStorage = require("../data/receiptStorage");
const { calculateTotalPoints } = require("../helper/pointsHelper");

exports.receiptIdCreatePost = (req, res, next) => {
  const { body, id } = req;
  receiptStorage[id] = body;
  console.log("receiptStorage: ", JSON.stringify(receiptStorage));
  res.send({ id });
};

exports.receiptPointsGet = (req, res, next) => {
  const { id } = req.params;

  if (!receiptStorage.hasOwnProperty(id)) {
    return res.status(404).json("No receipt found fo that id");
  }

  const receipt = receiptStorage[id];
  const points = calculateTotalPoints(receipt);
  res.send({ points });
};
