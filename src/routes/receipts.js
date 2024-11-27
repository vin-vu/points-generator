const express = require("express");
const router = express.Router();

const receiptController = require("../controller/receiptsController");

const validateReceiptInput = require("../middleware/validateReceipt");
const handleRequestValidationErrors = require("../middleware/handleValidationErrors");
const assignReceiptId = require("../middleware/generateId");

// POST request for storing receipts and receipt ID
router.post(
  "/process",
  ...validateReceiptInput,
  handleRequestValidationErrors,
  assignReceiptId,
  receiptController.createReceipt
);

// GET request for getting number of points
router.get("/:id/points", receiptController.getPoints);

module.exports = router;
