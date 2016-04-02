var Chips = (function () {
  function create() {
    var costInDollars = 0.5;
    return Product.create(costInDollars);
  }

  return deepFreeze({
    create: create
  });
})();
