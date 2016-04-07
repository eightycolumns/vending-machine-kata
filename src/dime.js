var Dime = (function () {

function create() {
  var spec = {
    weightInGrams: 2.268,
    diameterInMillimeters: 17.91,
    thicknessInMillimeters: 1.35
  };

  return Coin.create(spec);
}

return deepFreeze({
  create: create
});

})();
