const receiptStorage = require("../data/receiptStorage");
const { saveReceipt, getPoints } = require("../controller/receiptsController");
const { calculateTotalPoints } = require("../helper/pointsHelper");
const { validationResult } = require("express-validator");

jest.mock("../data/receiptStorage", () => ({}));
jest.mock("express-validator", () => ({
  validationResult: jest.fn(),
}));
jest.mock("../helper/pointsHelper", () => ({
  calculateTotalPoints: jest.fn().mockReturnValue(42),
}));

describe("Receipts Controller", () => {
  describe("saveReciept", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      for (const key in receiptStorage) delete receiptStorage[key];
    });

    it("should save a valid receipt and return the ID", () => {
      // Mock request and response
      const mockReq = {
        body: {
          retailer: "Target",
          purchaseDate: "2022-01-01",
          purchaseTime: "13:01",
          items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
          total: "35.35",
        },
        id: "123",
      };
      const mockRes = { send: jest.fn() };
      const mockNext = jest.fn();

      // Mock validationResult to return no errors
      validationResult.mockReturnValue({
        isEmpty: () => true,
      });

      saveReceipt(mockReq, mockRes, mockNext);

      // Assertions
      expect(receiptStorage).toHaveProperty("123", mockReq.body); // Receipt saved correctly
      expect(mockRes.send).toHaveBeenCalledWith({ id: "123" }); // Correct response sent
      expect(mockNext).not.toHaveBeenCalled(); // No error occurred
    });

    it("should return error for invalid receipt", () => {
      // Mock request and response
      const mockReq = {
        body: {
          retailer: "Target!", // Invalid retailer
          purchaseDate: "2022-01-01",
          purchaseTime: "13:01",
          items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
          total: "35.35",
        },
        id: "123",
      };
      const mockRes = { send: jest.fn() };
      const mockNext = jest.fn();

      // Mock validationResult to return error
      validationResult.mockReturnValue({
        isEmpty: () => false,
        errors: [
          {
            type: "field",
            value: "Target!",
            msg: "Retailer must be a valid alphanumeric string",
            path: "retailer",
            location: "body",
          },
        ],
      });

      saveReceipt(mockReq, mockRes, mockNext);

      // Assertions
      expect(receiptStorage).not.toHaveProperty("123"); // Receipt not saved
      expect(mockRes.send).not.toHaveBeenCalled(); // No response sent
      expect(mockNext).toHaveBeenCalled(); // Error handling invoked
      const error = mockNext.mock.calls[0][0];
      expect(error).toHaveProperty("status", 400);
      expect(error).toHaveProperty("details", [
        {
          type: "field",
          value: "Target!",
          msg: "Retailer must be a valid alphanumeric string",
          path: "retailer",
          location: "body",
        },
      ]);
    });

    describe("getPoints", () => {
      it("should return points for a valid receipt ID", () => {
        // Populate mock receiptStorage
        receiptStorage["123"] = {
          retailer: "Target",
          purchaseDate: "2022-01-01",
          purchaseTime: "13:01",
          items: [{ shortDescription: "Mountain Dew 12PK", price: "6.49" }],
          total: "35.35",
        };

        const mockReq = { params: { id: "123" } };
        const mockRes = { send: jest.fn() };
        const mockNext = jest.fn();

        getPoints(mockReq, mockRes, mockNext);

        // Assertions
        expect(calculateTotalPoints).toHaveBeenCalledWith(
          receiptStorage["123"]
        );
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
});
