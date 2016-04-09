var ProductPricer = (function () {

function create() {
  var productPricesInCents = {};

  function getProductPriceInCents(productName) {
    if (productName === 'Cola') {
      return productPricesInCents.cola;
    } else if (productName === 'Chips') {
      return productPricesInCents.chips;
    } else if (productName === 'Candy') {
      return productPricesInCents.candy;
    }
  }

  function setProductPriceInCents(productName, productPriceInCents) {
    productName = productName.toLowerCase();
    productPricesInCents[productName] = productPriceInCents;
  }

  return deepFreeze({
    getProductPriceInCents: getProductPriceInCents,
    setProductPriceInCents: setProductPriceInCents
  });
}

return deepFreeze({
  create: create
});

})();
