const receiptStorage = require("../data/receiptStorage");

exports.receiptIdCreateGet = (req, res, next) => {
  const { body, id } = req;
  receiptStorage[id] = body;
  console.log("receiptStorage: ", JSON.stringify(receiptStorage));
  res.send({ id });
};
