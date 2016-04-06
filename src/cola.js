var Cola = (function () {
  function create() {
    var name = 'Cola';
    var costInCents = 100;

    return Product.create(name, costInCents);
  }

  return deepFreeze({
    create: create
  });
})();
