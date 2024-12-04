const {
  calculateRetailerPoints,
  calculateIsInteger,
  calculateIsMultiplePoint25,
  calculateItemLengthPoints,
  calculateItemDescriptionPoints,
  calculateDayPoints,
  calculatePurchaseTimePoints
} = require("./pointsHelper");

describe("Helper Functions", () => {
  it("should calculate retailer points correctly", () => {
    const retailer = "Retailer1";
    expect(calculateRetailerPoints(retailer)).toBe(9);
  });

  it("should return 50 if the total is an integer", () => {
    expect(calculateIsInteger(100)).toBe(50);
    expect(calculateIsInteger(100.5)).toBe(0);
  });

  it("should return 25 if the total is a multiple of 0.25", () => {
    expect(calculateIsMultiplePoint25(100)).toBe(25);
    expect(calculateIsMultiplePoint25(100.15)).toBe(0);
  });

  it("should calculate points based on item length", () => {
    const items = [{}, {}, {}, {}];
    expect(calculateItemLengthPoints(items)).toBe(10);
  });

  it("should calculate points based on item description", () => {
    const items = [
      { shortDescription: "abc", price: "10" },
      { shortDescription: "def", price: "15" }
    ];
    expect(calculateItemDescriptionPoints(items)).toBe(5);
  });

  it("should calculate day points based on the date", () => {
    expect(calculateDayPoints("2024-12-03")).toBe(6);
    expect(calculateDayPoints("2024-12-04")).toBe(0);
  });

  it("should calculate purchase time points correctly", () => {
    expect(calculatePurchaseTimePoints("15:30")).toBe(10);
    expect(calculatePurchaseTimePoints("10:30")).toBe(0);
  });
});
