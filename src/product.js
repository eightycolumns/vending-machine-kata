var Product = (function () {
  function create(costInDollars) {

    function getCostInDollars() {
      return costInDollars;
    }

    return deepFreeze({
      getCostInDollars: getCostInDollars
    });
  }

  return deepFreeze({
    create: create
  });
})();
