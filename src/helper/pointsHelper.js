module.exports.calculateTotalPoints = (receipt) => {
  let pointsTotal = 0;

  const retailer = receipt.retailer;
  const alphanumericCountRetailer = retailer
    .split("")
    .filter((char) => /[a-zA-Z0-9]/.test(char)).length;
    console.log('retailer points: ', alphanumericCountRetailer)
  pointsTotal += alphanumericCountRetailer;

  const receiptTotal = Number(receipt.total);

  if (receiptTotal % 1 === 0) {
    pointsTotal += 50;
    console.log("no cents points: 50");
  }

  if (receiptTotal % 0.25 === 0) {
    pointsTotal += 25;
    console.log('multiple of 0.25 points: 25')
  }

  const itemsLengthDivide2 = Math.floor(receipt.items.length / 2);
  console.log('itemsLengthDivide2 points: ', itemsLengthDivide2)
  pointsTotal += itemsLengthDivide2

  const itemsDescriptionPoints = receipt.items.reduce((acc, item) => {
    const descriptionLength = item.shortDescription.trim().length;
    if (descriptionLength % 3 === 0) {
      const descriptionPoints = Math.ceil(Number(item.price) * 0.2)
      console.log('item descrip: ', item.shortDescription, 'points: ', descriptionPoints)
      acc += descriptionPoints
    }
    return acc;
  }, 0)

  console.log('itemsDescriptionPoints: ', itemsDescriptionPoints)
  pointsTotal += itemsDescriptionPoints


  console.log("pointsTotal: ", pointsTotal);
};
