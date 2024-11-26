module.exports.calculateTotalPoints = (receipt) => {

  const retailer = receipt.retailer;
  const alphanumericCountRetailer = retailer.split('').filter(char => /[a-zA-Z0-9]/.test(char)).length;
  console.log('alphanumeric count: ', alphanumericCountRetailer)


  console.log('receipt: ', JSON.stringify(receipt))
}