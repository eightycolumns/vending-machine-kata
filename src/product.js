var Product = (function () {
  function create(name, costInCents) {

    function getName() {
      return name;
    }

    function getCostInCents() {
      return costInCents;
    }

    return deepFreeze({
      getName: getName,
      getCostInCents: getCostInCents
    });
  }

  return deepFreeze({
    create: create
  });
})();
