var VendingMachine = (function () {
  function create() {
    var coinReturn = CoinReturn.create();
    var coinsOnHand = [];
    var displayText = 'INSERT COINS';
    var dollarsInserted = 0;
    var outputBin = OutputBin.create();

    function coinIsDime(coin) {
      var dime = Dime.create();

      var coinWeightInGrams = coin.getWeightInGrams();
      var dimeWeightInGrams = dime.getWeightInGrams();

      var coinDiameterInMillimeters = coin.getDiameterInMillimeters();
      var dimeDiameterInMillimeters = dime.getDiameterInMillimeters();

      var coinThicknessInMillimeters = coin.getThicknessInMillimeters();
      var dimeThicknessInMillimeters = dime.getThicknessInMillimeters();

      return (
        coinWeightInGrams === dimeWeightInGrams &&
        coinDiameterInMillimeters === dimeDiameterInMillimeters &&
        coinThicknessInMillimeters === dimeThicknessInMillimeters
      );
    }

    function coinIsNickel(coin) {
      var nickel = Nickel.create();

      var coinWeightInGrams = coin.getWeightInGrams();
      var nickelWeightInGrams = nickel.getWeightInGrams();

      var coinDiameterInMillimeters = coin.getDiameterInMillimeters();
      var nickelDiameterInMillimeters = nickel.getDiameterInMillimeters();

      var coinThicknessInMillimeters = coin.getThicknessInMillimeters();
      var nickelThicknessInMillimeters = nickel.getThicknessInMillimeters();

      return (
        coinWeightInGrams === nickelWeightInGrams &&
        coinDiameterInMillimeters === nickelDiameterInMillimeters &&
        coinThicknessInMillimeters === nickelThicknessInMillimeters
      );
    }

    function coinIsQuarter(coin) {
      var quarter = Quarter.create();

      var coinWeightInGrams = coin.getWeightInGrams();
      var quarterWeightInGrams = quarter.getWeightInGrams();

      var coinDiameterInMillimeters = coin.getDiameterInMillimeters();
      var quarterDiameterInMillimeters = quarter.getDiameterInMillimeters();

      var coinThicknessInMillimeters = coin.getThicknessInMillimeters();
      var quarterThicknessInMillimeters = quarter.getThicknessInMillimeters();

      return (
        coinWeightInGrams === quarterWeightInGrams &&
        coinDiameterInMillimeters === quarterDiameterInMillimeters &&
        coinThicknessInMillimeters === quarterThicknessInMillimeters
      );
    }

    function dispenseProduct(product) {
      outputBin.addProductToContents(product);
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
          dispenseProduct(cola);
          displayText = 'THANK YOU';
        } else {
          displayText = 'PRICE: $' + costInDollars.toFixed(2);
        }
      }
    }

    function getCoinValueInDollars(coin) {
      if (coinIsNickel(coin)) {
        return 0.05;
      } else if (coinIsDime(coin)) {
        return 0.1;
      } else if (coinIsQuarter(coin)) {
        return 0.25;
      }
    }

    function acceptCoin(coin) {
      var coinValueInDollars = getCoinValueInDollars(coin);
      dollarsInserted += coinValueInDollars;
      displayText = '$' + dollarsInserted.toFixed(2);
      coinsOnHand.push(coin);
    }

    function onCoinInserted(coin) {
      if (coinIsNickel(coin) || coinIsDime(coin) || coinIsQuarter(coin)) {
        acceptCoin(coin);
      } else {
        rejectCoin(coin);
      }
    }

    function rejectCoin(coin) {
      coinReturn.addCoinToContents(coin);
    }

    return deepFreeze({
      coinReturn: coinReturn,
      dispenseProduct: dispenseProduct,
      getCoinReturnContents: getCoinReturnContents,
      getCoinsOnHand: getCoinsOnHand,
      getDisplayText: getDisplayText,
      onButtonPressed: onButtonPressed,
      onCoinInserted: onCoinInserted,
      outputBin: outputBin
    });
  }

  return deepFreeze({
    create: create
  });
})();
