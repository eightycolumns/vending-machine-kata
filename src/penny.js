var Penny = (function () {
  function create() {
    var weightInGrams = 2.5;
    var diameterInMillimeters = 19.05;

    function getWeightInGrams() {
      return weightInGrams;
    }

    function getDiameterInMillimeters() {
      return diameterInMillimeters;
    }

    return deepFreeze({
      getWeightInGrams: getWeightInGrams,
      getDiameterInMillimeters: getDiameterInMillimeters
    });
  }

  return deepFreeze({
    create: create
  });
})();
