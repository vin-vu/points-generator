const express = require("express");
const router = express.Router();

const generateUniqueId = require("../middleware/generateId");
const receiptController = require("../controller/receiptsController");
const validateRequest = require("../middleware/validateReceipt");
const handleValidationErrors = require("../middleware/handleValidationErrors");

// POST request for generating receipt ID
router.post(
  "/process",
  ...validateRequest,
  handleValidationErrors,
  generateUniqueId,
  receiptController.receiptIdCreateGet
);

module.exports = router;
