var ProductPricer = (function () {

function create() {

  function getProductPriceInCents(productName) {
    if (productName === 'Cola') {
      return 100;
    } else if (productName === 'Chips') {
      return 50;
    } else if (productName === 'Candy') {
      return 65;
    }
  }

  return deepFreeze({
    getProductPriceInCents: getProductPriceInCents
  });
}

return deepFreeze({
  create: create
});

})();
