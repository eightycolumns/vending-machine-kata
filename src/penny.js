var Penny = (function () {
  function create() {
    var weightInGrams = 2.5;
    var diameterInMillimeters = 19.05;
    var thicknessInMillimeters = 1.52;

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
