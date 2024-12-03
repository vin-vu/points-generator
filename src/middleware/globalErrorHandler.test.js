const express = require("express");
const request = require("supertest");
const globalErrorHandler = require("./globalErrorHandler");

const app = express();
app.use(express.json());

// Simulate an error directly assuming valid receipt
app.post("/receipts/process", (req, res, next) => {
  const error = new Error("Unexpected error");
  return next(error);
});

app.get("/receipts/:id/points", (req, res, next) => {
  const error = new Error("No receipt found for that id");
  error.status = 404;
  error.details = "No receipt found for that id";
  return next(error);
});

// Attach the global error handler
app.use(globalErrorHandler);

describe("Global Error Handler", () => {
  it("Should handle unexpected errors from /process route", async () => {
    const validReceipt = {
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:01",
      items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
      total: "35.35",
    };

    const res = await request(app).post("/receipts/process").send(validReceipt);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal Server Error" });
  });

  it("Should handle 404 errors from /:id/points route", async () => {
    const res = await request(app).get("/receipts/invalid123/points");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "No receipt found for that id" });
  });
});
