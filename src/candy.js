var Candy = (function () {
  function create() {
    var costInCents = 65;
    return Product.create(costInCents);
  }

  return deepFreeze({
    create: create
  });
})();
