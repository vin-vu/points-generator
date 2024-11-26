const idStorage = require("../data/receiptStorage");

exports.receiptIdCreateGet = (req, res, next) => {
  const { body, id } = req;
  idStorage[id] = body;
  console.log("id storage: ", JSON.stringify(idStorage));
  res.send({ id });
};
