var VendingMachine = (function () {
  function create() {
    var coinReturn = CoinReturn.create();
    var coinsOnHand = [];
    var displayText = 'INSERT COINS';
    var dollarsInserted = 0;

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

    function onButtonPressed(button) {
      if (button === 'Cola') {
        var cola = Cola.create();
        var costInDollars = cola.getCostInDollars();

        if (costInDollars <= dollarsInserted) {
          displayText = 'THANK YOU';
        }
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

      if (dollarsInserted > 0) {
        displayText = '$' + dollarsInserted.toFixed(2);
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
      onButtonPressed: onButtonPressed,
      onCoinInserted: onCoinInserted
    });
  }

  return deepFreeze({
    create: create
  });
})();
