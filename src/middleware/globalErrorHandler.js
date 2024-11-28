const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const details = err.details || "Internal Server Error";

  return res.status(statusCode).json({
    description: err.message,
    error: err.details,
  });
};

module.exports = globalErrorHandler;
