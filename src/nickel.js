var Nickel = (function () {
  function create() {
    var spec = {
      weightInGrams: 5,
      diameterInMillimeters: 21.21,
      thicknessInMillimeters: 1.95
    };

    return Coin.create(spec);
  }

  return deepFreeze({
    create: create
  });
})();
