var Chips = (function () {
  function create() {
    var name = 'Chips';
    var costInCents = 50;

    return Product.create(name, costInCents);
  }

  return deepFreeze({
    create: create
  });
})();
