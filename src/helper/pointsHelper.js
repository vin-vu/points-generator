module.exports.calculateTotalPoints = (receipt) => {
  let pointsTotal = 0;

  const retailer = receipt.retailer;
  const alphanumericCountRetailer = retailer
    .split("")
    .filter((char) => /[a-zA-Z0-9]/.test(char)).length;
  pointsTotal += alphanumericCountRetailer;

  const receiptTotal = Number(receipt.total);

  if (receiptTotal % 1 === 0) {
    pointsTotal += 50;
    console.log("no cents");
  }

  if (receiptTotal % 0.25 === 0) {
    pointsTotal += 25;
    console.log('multiple of 0.25')
  }

  const itemsLengthDivide2 = Math.floor(receipt.items.length / 2);
  console.log('itemsLengthDivide2: ', itemsLengthDivide2)
  pointsTotal += itemsLengthDivide2


  console.log("pointsTotal: ", pointsTotal);
};
