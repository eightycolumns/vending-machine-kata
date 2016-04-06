var Chips = (function () {
  function create() {
    var costInCents = 50;
    return Product.create(costInCents);
  }

  return deepFreeze({
    create: create
  });
})();
