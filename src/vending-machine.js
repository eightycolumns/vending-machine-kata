var VendingMachine = (function () {
  function create() {
    var coinReturn = CoinReturn.create();
    var coinsOnHand = [];
    var displayText = 'INSERT COINS';
    var centsInserted = 0;
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
      var product = undefined;

      if (button === 'Cola') {
        product = Cola.create();
      } else if (button === 'Chips') {
        product = Chips.create();
      } else if (button === 'Candy') {
        product = Candy.create();
      }

      var productCostInCents = product.getCostInCents();

      if (centsInserted >= productCostInCents) {
        dispenseProduct(product);
        makeChange(centsInserted, productCostInCents);
        centsInserted = 0;
        displayText = 'THANK YOU';
      } else {
        displayText = 'PRICE: $' + (productCostInCents / 100).toFixed(2);
      }
    }

    function makeChange(centsInserted, productCostInCents) {
      var change = centsInserted - productCostInCents;

      var valueOfNickel = 5;
      var valueOfDime = 10;
      var valueOfQuarter = 25;

      while (change > 0) {
        if (change >= valueOfQuarter) {
          var quarter = Quarter.create();
          coinReturn.addCoinToContents(quarter);
          change -= valueOfQuarter;
        } else if (change >= valueOfDime) {
          var dime = Dime.create();
          coinReturn.addCoinToContents(dime);
          change -= valueOfDime;
        } else if (change >= valueOfNickel) {
          var nickel = Nickel.create();
          coinReturn.addCoinToContents(nickel);
          change -= valueOfNickel;
        }
      }
    }

    function getCoinValueInCents(coin) {
      if (coinIsNickel(coin)) {
        return 5;
      } else if (coinIsDime(coin)) {
        return 10;
      } else if (coinIsQuarter(coin)) {
        return 25;
      }
    }

    function acceptCoin(coin) {
      var coinValueInCents = getCoinValueInCents(coin);
      centsInserted += coinValueInCents;
      displayText = '$' + (centsInserted / 100).toFixed(2);
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
