var Candy = (function () {
  function create() {
    var costInDollars = 0.65;
    return Product.create(costInDollars);
  }

  return deepFreeze({
    create: create
  });
})();
