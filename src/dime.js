var Dime = (function () {
  function create() {
    var spec = {
      weightInGrams: 2.268
    };

    return Coin.create(spec);
  }

  return deepFreeze({
    create: create
  });
})();
