const express = require("express");
const router = express.Router();

const receiptController = require("../controller/receiptsController");

const generateUniqueId = require("../middleware/generateId");
const validateRequest = require("../middleware/validateReceipt");
const handleValidationErrors = require("../middleware/handleValidationErrors");

// POST request for storing receipts and receipt ID
router.post(
  "/process",
  ...validateRequest,
  handleValidationErrors,
  generateUniqueId,
  receiptController.receiptIdCreatePost
);

// GET request for getting number of points
router.get("/:id/points", receiptController.receiptPointsGet);

module.exports = router;
