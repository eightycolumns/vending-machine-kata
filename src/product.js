var Product = (function () {
  function create(costInCents) {

    function getCostInCents() {
      return costInCents;
    }

    return deepFreeze({
      getCostInCents: getCostInCents
    });
  }

  return deepFreeze({
    create: create
  });
})();
