var Nickel = (function () {
  function create() {
    var weightInGrams = 5;

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
