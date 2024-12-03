jest.mock("../data/receiptStorage", () => ({}));

const receiptStorage = require("../data/receiptStorage");

const { saveReceipt, getPoints } = require("../controller/receiptsController");

describe("Receipts Controller", () => {
  describe("saveReciept", () => {
    it("should save receipt and return the ID", () => {
      const mockReq = { body: { retailer: "Target" }, id: "123" };
      const mockRes = { send: jest.fn() };
      const mockNext = jest.fn();

      saveReceipt(mockReq, mockRes, mockNext);

      // Assertions
      expect(receiptStorage).toHaveProperty("123", { retailer: "Target" }); // Receipt was saved
      expect(mockRes.send).toHaveBeenCalledWith({ id: "123" }); // Correct response sent
      expect(mockNext).not.toHaveBeenCalled(); // No error occured
    });
  });

  describe("getPoints", () => {
    it("should return points for a valid receipt ID", () => {
      // Populate mock receiptStorage
      receiptStorage["123"] = {
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

      const mockReq = { params: { id: "123" } };
      const mockRes = { send: jest.fn() };
      const mockNext = jest.fn();

      getPoints(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.send).toHaveBeenCalledWith(
        expect.objectContaining({ points: expect.any(Number) })
      ); // Points Returned
      expect(mockNext).not.toHaveBeenCalled(); // No error occured
    });

    it("should return 404 with error message for invald receipt ID", () => {
      const mockReq = { params: { id: "abc" } };
      const mockRes = { send: jest.fn() };
      const mockNext = jest.fn();

      getPoints(mockReq, mockReq, mockNext);

      // Assertions
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 404,
          details: "No receipt found for that id",
        })
      ); // Pass 404 error to next global error handler
      expect(mockRes.send).not.toHaveBeenCalledWith(); // No response sent
    });
  });
});
