const request = require("supertest");
const app = require("../../app");

describe("Receipt Processor API", () => {
  describe("Test case 1", () => {
    let receiptId;

    const receipt = {
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:01",
      items: [
        { shortDescription: "Mountain Dew 12PK", price: "6.49" },
        { shortDescription: "Emils Cheese Pizza", price: "12.25" },
        { shortDescription: "Knorr Creamy Chicken", price: "1.26" },
        { shortDescription: "Doritos Nacho Cheese", price: "3.35" },
        { shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ", price: "12.00" },
      ],
      total: "35.35",
    };

    it("should store the receipt and return a valid ID", async () => {
      const response = await request(app)
        .post("/receipts/process")
        .send(receipt)
        .expect(200);

      // Ensure the response contains a valid ID
      expect(response.body).toHaveProperty("id");
      expect(typeof response.body.id).toBe("string");

      // Save the ID for the next test
      receiptId = response.body.id;
    });

    it("should calculate 28 points for the stored receipt", async () => {
      const response = await request(app)
        .get(`/receipts/${receiptId}/points`)
        .expect(200);

      // Validate the points calculation
      expect(response.body).toHaveProperty("points");
      expect(response.body.points).toBe(28);
    });
  });

  describe("Test case 2", () => {
    let receiptId;

    const receipt = {
      retailer: "M&M Corner Market",
      purchaseDate: "2022-03-20",
      purchaseTime: "14:33",
      items: [
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
      ],
      total: "9.00",
    };

    it("should store the receipt and return a valid ID", async () => {
      const response = await request(app)
        .post("/receipts/process")
        .send(receipt)
        .expect(200);

      // Ensure the response contains a valid ID
      expect(response.body).toHaveProperty("id");
      expect(typeof response.body.id).toBe("string");

      // Save the ID for the next test
      receiptId = response.body.id;
    });

    it("should calculate 28 points for the stored receipt", async () => {
      const response = await request(app)
        .get(`/receipts/${receiptId}/points`)
        .expect(200);

      // Validate the points calculation
      expect(response.body).toHaveProperty("points");
      expect(response.body.points).toBe(109);
    });
  });

  describe("Test case 3", () => {
    const receipt = {
      retailer: "M&M Corner Market!!!",
      purchaseDate: "2022-03-20",
      purchaseTime: "14:33",
      items: [
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
      ],
      total: "9.00",
    };

    it("should return 400 for invalid receipt", async () => {
      const response = await request(app)
        .post("/receipts/process")
        .send(receipt)
        .expect(400);

      // Ensure the response contains error array
      expect(response.body).toHaveProperty("error");
      expect(Array.isArray(response.body.error)).toBe(true);
    });
  });
});
