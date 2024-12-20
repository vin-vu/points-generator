const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const details = err.details || "Internal Server Error";

  return res.status(statusCode).json({
    error: details,
  });
};

module.exports = globalErrorHandler;
