const express = require("express");
const router = express.Router();

const generateUniqueId = require("../middleware/generateId");
const receiptController = require("../controller/receiptsController");

// POST request for generating receipt ID
router.post("/process", generateUniqueId, receiptController.receiptIdCreateGet);

module.exports = router;
