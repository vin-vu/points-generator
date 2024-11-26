exports.receiptIdCreateGet = (req, res, next) => {
  const { id } = req;
  res.send({ id });
};
