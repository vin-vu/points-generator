const receiptStorage = require("../data/receiptStorage");

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
  console.log("id: ", id);
  res.send(id);
};
