// Helper functions
const calculateRetailerPoints = (retailer) => {
  return retailer.split("").filter((char) => /[a-zA-Z0-9]/.test(char)).length;
};

const calculateIsInteger = (receiptTotal) => {
  return receiptTotal % 1 === 0 ? 50 : 0;
};

const calculateIsMultiplePoint25 = (receiptTotal) => {
  return receiptTotal % 0.25 === 0 ? 25 : 0;
};

const calculateItemLengthPoints = (items) => {
  return Math.floor(items.length / 2) * 5;
};

const calculateItemDescriptionPoints = (items) => {
  return items.reduce((acc, item) => {
    const descriptionLength = item.shortDescription.trim().length;
    if (descriptionLength % 3 === 0) {
      const descriptionPoints = Math.ceil(Number(item.price) * 0.2);
      acc += descriptionPoints;
    }
    return acc;
  }, 0);
};

const calculateDayPoints = (date) => {
  const [year, month, day] = date.split("-").map(Number);
  return day % 2 !== 0 ? 6 : 0;
};

const calculatePurchaseTimePoints = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  const startMinutes = 14 * 60;
  const endMinutes = 16 * 60;
  return startMinutes < totalMinutes && totalMinutes < endMinutes ? 10 : 0;
};

// Main function to calculate total points
const calculateTotalPoints = (receipt) => {
  const totalPoints = [
    calculateRetailerPoints(receipt.retailer),
    calculateIsInteger(Number(receipt.total)),
    calculateIsMultiplePoint25(Number(receipt.total)),
    calculateItemLengthPoints(receipt.items),
    calculateItemDescriptionPoints(receipt.items),
    calculateDayPoints(receipt.purchaseDate),
    calculatePurchaseTimePoints(receipt.purchaseTime),
  ].reduce((acc, points) => acc + points, 0);

  return totalPoints;
};

module.exports = {
  calculateRetailerPoints,
  calculateIsInteger,
  calculateIsMultiplePoint25,
  calculateItemLengthPoints,
  calculateItemDescriptionPoints,
  calculateDayPoints,
  calculatePurchaseTimePoints,
  calculateTotalPoints,
};
