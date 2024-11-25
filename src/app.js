const express = require("express");
const app = express();
const port = 3000;

const receiptsRouter = require('./routes/receipts.js')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/receipts", receiptsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Receipt processor listening on port ${port}!`);
});

module.exports = app;
