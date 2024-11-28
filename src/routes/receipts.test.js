const request = require("supertest");
const app = require("../app");

describe("Receipts API Tests", () => {
  const validReceipt = {
    retailer: "Target",
    purchaseDate: "2022-01-01",
    purchaseTime: "13:01",
    items: [
      {
        shortDescription: "Mountain Dew 12PK",
        price: "6.49",
      },
      {
        shortDescription: "Emils Cheese Pizza",
        price: "12.25",
      },
      {
        shortDescription: "Knorr Creamy Chicken",
        price: "1.26",
      },
      {
        shortDescription: "Doritos Nacho Cheese",
        price: "3.35",
      },
      {
        shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
        price: "12.00",
      },
    ],
    total: "35.35",
  };

  it("POST /receipts/process - should process and return receipt ID", async () => {
    const res = await request(app).post("/receipts/process").send(validReceipt);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("POST /receipts/process - should return 404 for invalid receipt", async () => {
    const invalidReceipt = { ...validReceipt, retailer: "!!!" };
    const res = await request(app)
      .post("/receipts/process")
      .send(invalidReceipt);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("description");
  });
});
