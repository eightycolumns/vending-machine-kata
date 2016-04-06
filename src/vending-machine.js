var VendingMachine = (function () {
  function create() {
    var coinReturn = CoinReturn.create();
    var display = Display.create('INSERT COINS');
    var outputBin = OutputBin.create();

    var coinsOnHand = [];
    var productsOnHand = [];

    var coinsInserted = [];

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
      coinsInserted.push(coin);
      var centsInserted = getTotalValueOfCoinsInCents(coinsInserted);
      display.setText('$' + (centsInserted / 100).toFixed(2));
    }

    function getTotalValueOfCoinsInCents(coins) {
      var totalValueOfCoinsInCents = 0;

      coins.forEach(function (coin) {
        totalValueOfCoinsInCents += getValueOfCoinInCents(coin);
      });

      return totalValueOfCoinsInCents;
    }

    function getValueOfCoinInCents(coin) {
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
      if (button === 'Return Coins') {
        while (coinsInserted.length > 0) {
          coinReturn.addCoinToContents(coinsInserted.pop());
        }

        return undefined;
      } else if (button === 'Cola') {
        var product = Cola.create();
      } else if (button === 'Chips') {
        var product = Chips.create();
      } else if (button === 'Candy') {
        var product = Candy.create();
      } else {
        return undefined;
      }

      var centsInserted = getTotalValueOfCoinsInCents(coinsInserted);
      var productCostInCents = product.getCostInCents();

      if (centsInserted >= productCostInCents) {
        while (coinsInserted.length > 0) {
          coinsOnHand.push(coinsInserted.pop());
        }

        dispenseProduct(product);
        makeChange(centsInserted, productCostInCents);
        display.setText('THANK YOU');
        endTransaction();
      } else {
        display.setText('PRICE: $' + (productCostInCents / 100).toFixed(2));
      }
    }

    function pressColaButton() {
      var colaSoldOut = productsOnHand.every(function (product) {
        return product.getName() !== 'Cola';
      });

      if (colaSoldOut) {
        display.setText('SOLD OUT');
      } else {
        var cola = (function () {
          for (var i = 0; i < productsOnHand.length; i += 1) {
            var product = productsOnHand[i];
            product = JSON.stringify(product);

            var cola = Cola.create();
            cola = JSON.stringify(cola);

            if (product === cola) {
              return productsOnHand.splice(i, 1).pop();
            }
          }
        })();

        outputBin.addProductToContents(cola);
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
      pressButton: pressButton,
      pressColaButton: pressColaButton
    });
  }

  return deepFreeze({
    create: create
  });
})();
