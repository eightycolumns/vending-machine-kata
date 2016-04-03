var VendingMachine = (function () {
  function create() {
    var nickelCount = 0;

    function coinIsNickel(coin) {
      var nickel = Nickel.create();

      var actualWeight = coin.getWeightInGrams();
      var expectedWeight = nickel.getWeightInGrams();

      var actualDiameter = coin.getDiameterInMillimeters();
      var expectedDiameter = nickel.getDiameterInMillimeters();

      var actualThickness = coin.getThicknessInMillimeters();
      var expectedThickness = nickel.getThicknessInMillimeters();

      return (
        actualWeight === expectedWeight &&
        actualDiameter === expectedDiameter &&
        actualThickness === expectedThickness
      );
    }

    function getNickelCount() {
      return nickelCount;
    }

    function onCoinInserted(coin) {
      if (coinIsNickel(coin)) {
        nickelCount += 1;
      }
    }

    return deepFreeze({
      getNickelCount: getNickelCount,
      onCoinInserted: onCoinInserted
    });
  }

  return deepFreeze({
    create: create
  });
})();
