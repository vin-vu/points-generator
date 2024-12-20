const request = require("supertest");
const express = require("express");
const { validationResult } = require("express-validator");
const validateReceipt = require("./validateReceipt");

describe("validateReceipt middleware", () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.post("/receipts", validateReceipt, (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(200).send({ message: "Receipt valid!" });
    });
  });

  it("should return 400 if retailer is invalid", async () => {
    const invalidReceipt = {
      retailer: "!!!", // Invalid retailer name
      purchaseDate: "2022-01-01",
      purchaseTime: "13:01",
      items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
      total: "6.49",
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

  it("should return 400 if purchase date is invalid", async () => {
    const invalidReceipt = {
      retailer: "Target",
      purchaseDate: "2022-01-aa", // Invalid date format
      purchaseTime: "13:01",
      items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
      total: "6.49",
    };

    const res = await request(app).post("/receipts").send(invalidReceipt);
    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Purchase date must be a valid date string",
        }),
      ])
    );
  });

  it("should return 400 if purchase time is invalid", async () => {
    const invalidReceipt = {
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:aa", // Invalid time format, no items
      items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
      total: "6.49",
    };

    const res = await request(app).post("/receipts").send(invalidReceipt);
    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Purchase time must be a valid time in 24-hour format (HH:MM)",
        }),
      ])
    );
  });

  it("should return 400 if item list is empty", async () => {
    const invalidReceipt = {
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:00",
      items: [{ shortDescription: "Mountain Dew 12PK" }], // Invalid items list, item missing name/price
      total: "6.49",
    };

    const res = await request(app).post("/receipts").send(invalidReceipt);
    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Each item must have a name and price",
        }),
      ])
    );
  });

  it("should return 400 if item is missing a property", async () => {
    const invalidReceipt = {
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:00",
      items: [], // Invalid items list
      total: "6.49",
    };

    const res = await request(app).post("/receipts").send(invalidReceipt);
    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Items must be an array with at least one item",
        }),
      ])
    );
  });

  it("should return 400 if total is invalid", async () => {
    const invalidReceipt = {
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:01",
      items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
      total: "6.aa", // Invalid total format
    };

    const res = await request(app).post("/receipts").send(invalidReceipt);
    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Total must be a valid number with two decimal places (e.g., 6.49)",
        }),
      ])
    );
  });

  it("should return 200 for a valid receipt", async () => {
    const validReceipt = {
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:00",
      items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
      total: "6.49",
    };

    const res = await request(app).post("/receipts").send(validReceipt);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Receipt valid!");
  });
});
