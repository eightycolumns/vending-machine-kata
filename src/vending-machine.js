var VendingMachine = (function () {
  function create() {
    var coinReturn = CoinReturn.create();
    var display = Display.create('INSERT COINS');
    var outputBin = OutputBin.create();

    var coinsOnHand = [];
    var centsInserted = 0;

    function insertCoins(coins) {
      coins.forEach(function (coin) {
        insertCoin(coin);
      });
    }

    function insertCoin(coin) {
      if (coinIsNickel(coin) || coinIsDime(coin) || coinIsQuarter(coin)) {
        acceptCoin(coin);
      } else {
        rejectCoin(coin);
      }
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

    function acceptCoin(coin) {
      var coinValueInCents = getCoinValueInCents(coin);
      centsInserted += coinValueInCents;
      display.setText('$' + (centsInserted / 100).toFixed(2));
      coinsOnHand.push(coin);
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

    function rejectCoin(coin) {
      coinReturn.addCoinToContents(coin);
    }

    function pressButton(button) {
      if (button === 'Cola') {
        var product = Cola.create();
      } else if (button === 'Chips') {
        var product = Chips.create();
      } else if (button === 'Candy') {
        var product = Candy.create();
      } else {
        return undefined;
      }

      var productCostInCents = product.getCostInCents();

      if (centsInserted >= productCostInCents) {
        dispenseProduct(product);
        makeChange(centsInserted, productCostInCents);
        display.setText('THANK YOU');
        endTransaction();
      } else {
        display.setText('PRICE: $' + (productCostInCents / 100).toFixed(2));
      }
    }

    function dispenseProduct(product) {
      outputBin.addProductToContents(product);
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

    function endTransaction() {
      centsInserted = 0;
    }

    return deepFreeze({
      coinReturn: coinReturn,
      display: display,
      insertCoin: insertCoin,
      insertCoins: insertCoins,
      outputBin: outputBin,
      pressButton: pressButton
    });
  }

  return deepFreeze({
    create: create
  });
})();
