var Coin = (function () {

function create(spec) {

  function getWeightInGrams() {
    return spec.weightInGrams;
  }

  function getDiameterInMillimeters() {
    return spec.diameterInMillimeters;
  }

  function getThicknessInMillimeters() {
    return spec.thicknessInMillimeters;
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
