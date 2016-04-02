var Penny = (function () {
  function create() {
    var weightInGrams = 2.5;

    function getWeightInGrams() {
      return weightInGrams;
    }

    return deepFreeze({
      getWeightInGrams: getWeightInGrams
    });
  }

  return deepFreeze({
    create: create
  });
})();
