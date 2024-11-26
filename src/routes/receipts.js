const express = require("express");
const router = express.Router();

const generateUniqueId = require("../middleware/generateId");
const receiptController = require("../controller/receiptsController");

// GET request for generating receipt ID
router.get("/process", generateUniqueId, receiptController.receiptIdCreateGet);

module.exports = router;
