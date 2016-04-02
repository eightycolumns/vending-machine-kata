var Penny = (function () {
  function create() {
    var spec = {
      weightInGrams: 2.5,
      diameterInMillimeters: 19.05,
      thicknessInMillimeters: 1.52
    };

    return Coin.create(spec);
  }

  return deepFreeze({
    create: create
  });
})();
