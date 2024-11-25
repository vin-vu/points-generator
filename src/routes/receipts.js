const express = require('express');
const router = express.Router();

router.get('/process', (req, res) => {
  console.log('process endpoint')
  res.send("Unique ID")
})

module.exports = router;