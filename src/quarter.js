var Quarter = (function () {
  function create() {
    var spec = {
      weightInGrams: 5.67,
      diameterInMillimeters: 24.26
    };

    return Coin.create(spec);
  }

  return deepFreeze({
    create: create
  });
})();
