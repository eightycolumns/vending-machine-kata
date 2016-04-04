var VendingMachine = (function () {
  function create() {
    var coinReturn = CoinReturn.create();
    var coinsOnHand = [];
    var displayText = 'INSERT COIN';

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
      return displayText;
    }

    function onCoinInserted(coin) {
      if (coinIsNickel(coin)) {
        coinsOnHand.push(coin);
      } else if (coinIsDime(coin)) {
        coinsOnHand.push(coin);
      } else if (coinIsQuarter(coin)) {
        coinsOnHand.push(coin);
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
