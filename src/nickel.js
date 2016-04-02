var Nickel = (function () {
  function create() {
    var weightInGrams = 5;
    var diameterInMillimeters = 21.21;
    var thicknessInMillimeters = 1.95;

    function getWeightInGrams() {
      return weightInGrams;
    }

    function getDiameterInMillimeters() {
      return diameterInMillimeters;
    }

    function getThicknessInMillimeters() {
      return thicknessInMillimeters;
    }

    return deepFreeze({
      getWeightInGrams: getWeightInGrams,
      getDiameterInMillimeters: getDiameterInMillimeters,
      getThicknessInMillimeters: getThicknessInMillimeters
    });
  }

  return deepFreeze({
    create: create
  });
})();
