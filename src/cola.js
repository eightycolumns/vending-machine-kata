var Cola = (function () {
  function create() {
    var costInCents = 100;
    return Product.create(costInCents);
  }

  return deepFreeze({
    create: create
  });
})();
