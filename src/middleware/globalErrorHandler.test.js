const express = require("express");
const request = require("supertest");
const globalErrorHandler = require("./globalErrorHandler");

const app = express();
app.use(express.json());

// Simulate an error directly assuming valid receipt
app.post("/process", (req, res, next) => {
  const error = new Error("Unexpected error");
  next(error)
});

// Attach the global error handler
app.use(globalErrorHandler);

describe('Global Error Handler', () => {
  it('Should return 500 for unexpected errors with valid receipt', async () => {
    const validReceipt = {
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:01",
      items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
      total: "35.35",
    };

    const res = await request(app).post('/process').send(validReceipt);
    expect(res.status).toBe(500)
    expect(res.body).toEqual({error: "Internal Server Error"})
  })
})