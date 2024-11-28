const express = require("express");
const app = express();
const port = 3000;

const receiptsRouter = require("./routes/receipts.js");
const errorHandler = require('./middleware/globalErrorHandler.js')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Receipts route
app.use("/receipts", receiptsRouter);

// Global error handler
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Receipt processor listening on port ${port}!`);
});

module.exports = app;