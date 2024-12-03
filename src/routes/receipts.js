const express = require("express");
const router = express.Router();

// Controller
const receiptController = require("../controller/receiptsController");

// Middleware
const validateReceiptInput = require("../middleware/validateReceipt");
const assignReceiptId = require("../middleware/generateId");

// POST request for storing receipts
router.post(
  "/process",
  ...validateReceiptInput,
  assignReceiptId,
  receiptController.saveReceipt
);

// GET request for getting number of points
router.get("/:id/points", receiptController.getPoints);

module.exports = router;
