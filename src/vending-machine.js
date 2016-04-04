var VendingMachine = (function () {
  function create() {
    var dollarsInserted = 0;
    var coinReturn = CoinReturn.create();
    var coinsOnHand = [];

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

    function coinIsQuarter(coin) {
      var quarter = Quarter.create();

      var actualWeight = coin.getWeightInGrams();
      var expectedWeight = quarter.getWeightInGrams();

      var actualDiameter = coin.getDiameterInMillimeters();
      var expectedDiameter = quarter.getDiameterInMillimeters();

      var actualThickness = coin.getThicknessInMillimeters();
      var expectedThickness = quarter.getThicknessInMillimeters();

      return (
        actualWeight === expectedWeight &&
        actualDiameter === expectedDiameter &&
        actualThickness === expectedThickness
      );
    }

    function getCoinReturnContents() {
      return coinReturn.getContents();
    }

    function getCoinsOnHand() {
      return coinsOnHand;
    }

    function getDisplayText() {
      if (dollarsInserted === 0) {
        return 'INSERT COIN';
      } else {
        return '$' + dollarsInserted;
      }
    }

    function onCoinInserted(coin) {
      if (coinIsNickel(coin)) {
        coinsOnHand.push(coin);
        dollarsInserted += 0.05;
      } else if (coinIsDime(coin)) {
        coinsOnHand.push(coin);
        dollarsInserted += 0.1;
      } else if (coinIsQuarter(coin)) {
        coinsOnHand.push(coin);
        dollarsInserted += 0.25;
      } else {
        rejectCoin(coin);
      }
    }

    function rejectCoin(coin) {
      var coinReturnContents = coinReturn.getContents();
      coinReturnContents.push(coin);
      coinReturn.setContents(coinReturnContents);
    }

    return deepFreeze({
      coinReturn: coinReturn,
      getCoinReturnContents: getCoinReturnContents,
      getCoinsOnHand: getCoinsOnHand,
      getDisplayText: getDisplayText,
      onCoinInserted: onCoinInserted
    });
  }

  return deepFreeze({
    create: create
  });
})();
