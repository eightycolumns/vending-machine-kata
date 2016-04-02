var Cola = (function () {
  function create() {
    var costInDollars = 1;
    return Product.create(costInDollars);
  }

  return deepFreeze({
    create: create
  });
})();
