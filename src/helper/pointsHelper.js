module.exports.calculateTotalPoints = (receipt) => {
  let totalPoints = 0;

  const retailerPoints = calculateRetailerPoints(receipt.retailer);
  console.log("retailer points: ", retailerPoints);
  totalPoints += retailerPoints;

  const receiptIntegerPoints = calculateIsInteger(Number(receipt.total));
  console.log("receipt integer points: ", receiptIntegerPoints);
  totalPoints += receiptIntegerPoints;

  const receiptMultiplePoint25Points = calculateIsMultiplePoint25(
    Number(receipt.total)
  );
  console.log("receipt multiple 0.25 points: ", receiptMultiplePoint25Points);
  totalPoints += receiptMultiplePoint25Points;

  const itemLengthPoints = calculateItemLengthPoints(receipt.items);
  console.log("item length points: ", itemLengthPoints);
  totalPoints += itemLengthPoints;

  const itemDescriptionPoints = calculateItemDescriptionPoints(receipt.items);
  console.log("item description points: ", itemDescriptionPoints);
  totalPoints += itemDescriptionPoints;

  const dayPoints = calculateDayPoints(receipt.purchaseDate);
  console.log("day points: ", dayPoints);
  totalPoints += dayPoints;

  const purchaseTimePoints = calculatePurchaseTimePoints(receipt.purchaseTime);
  console.log("purchase time points: ", purchaseTimePoints);
  totalPoints += purchaseTimePoints;

  console.log("final points: ", totalPoints);
};

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
      console.log(
        "item descrip: ",
        item.shortDescription,
        "points: ",
        descriptionPoints
      );
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
  return startMinutes <= totalMinutes && totalMinutes <= endMinutes ? 10 : 0;
};
