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

  it("POST /receipts/process - should return 400 for invalid receipt", async () => {
    const invalidReceipt = { ...validReceipt, retailer: "!!!" };
    const res = await request(app)
      .post("/receipts/process")
      .send(invalidReceipt);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /receipts/:id/points - should return points for valid receipt ID", async () => {
    const postReceiptResponse = await request(app)
      .post("/receipts/process")
      .send(validReceipt);
    const receiptId = postReceiptResponse.body.id;

    const res = await request(app).get(`/receipts/${receiptId}/points`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("points");
  });

  it("GET /receipts/:id/points - should return 404 for nonexistent receipt ID", async () => {
    const res = await request(app).get("/receipts/id123/points");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
