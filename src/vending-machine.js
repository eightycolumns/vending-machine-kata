var VendingMachine = (function () {
  function create() {
    var dimeCount = 0;
    var nickelCount = 0;

    function coinIsDime(coin) {
      var dime = Dime.create();

      var actualWeight = coin.getWeightInGrams();
      var expectedWeight = dime.getWeightInGrams();

      var actualDiameter = coin.getDiameterInMillimeters();
      var expectedDiameter = dime.getDiameterInMillimeters();

      var actualThickness = coin.getThicknessInMillimeters();
      var expectedThickness = dime.getThicknessInMillimeters();

      return (
        actualWeight === expectedWeight &&
        actualDiameter === expectedDiameter &&
        actualThickness === expectedThickness
      );
    }

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

    function getDimeCount() {
      return dimeCount;
    }

    function getNickelCount() {
      return nickelCount;
    }

    function onCoinInserted(coin) {
      if (coinIsNickel(coin)) {
        nickelCount += 1;
      } else if (coinIsDime(coin)) {
        dimeCount += 1;
      }
    }

    return deepFreeze({
      getDimeCount: getDimeCount,
      getNickelCount: getNickelCount,
      onCoinInserted: onCoinInserted
    });
  }

  return deepFreeze({
    create: create
  });
})();
