const request = require("supertest");
const express = require("express");
const { validationResult } = require("express-validator");
const validateReceipt = require("./validateReceipt");

const app = express();

app.use(express.json());
app.post("/receipts", validateReceipt, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
});

describe("validateReceipt middleware", () => {
  it("should return 400 if retailer is invalid", async () => {
    const invalidReceipt = {
      retailer: "!!!", // Invalid retailer name
      purchaseDate: "2022-01-01",
      purchaseTime: "13:01",
      items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
      total: "35.35",
    };

    const res = await request(app).post("/receipts").send(invalidReceipt);
    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Retailer must be a valid alphanumeric string",
        }),
      ])
    );
  });
});
