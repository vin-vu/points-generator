const { v4: uuidv4 } = require("uuid");

const generateUniqueId = (req, res, next) => {
  req.id = uuidv4();
  next();
};

module.exports = generateUniqueId;
