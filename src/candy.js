var Candy = (function () {
  function create() {
    var name = 'Candy';
    var costInCents = 65;

    return Product.create(name, costInCents);
  }

  return deepFreeze({
    create: create
  });
})();
