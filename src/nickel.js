var Nickel = (function () {
  function create() {
    var weightInGrams = 5;
    var diameterInMillimeters = 21.21;

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
