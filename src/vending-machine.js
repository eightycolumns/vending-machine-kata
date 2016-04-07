var VendingMachine = (function () {

function create() {
  var coinReturn = CoinReturn.create();
  var display = Display.create('INSERT COINS');
  var outputBin = OutputBin.create();

  var coinsOnHand = [];
  var productsOnHand = [];

  var coinsInserted = [];

  function stockWithProducts(products) {
    products.forEach(function (product) {
      productsOnHand.push(product);
    });
  }

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

    return (
      coin.getWeightInGrams() === nickel.getWeightInGrams() &&
      coin.getDiameterInMillimeters() === nickel.getDiameterInMillimeters() &&
      coin.getThicknessInMillimeters() === nickel.getThicknessInMillimeters()
    );
  }

  function coinIsDime(coin) {
    var dime = Dime.create();

    return (
      coin.getWeightInGrams() === dime.getWeightInGrams() &&
      coin.getDiameterInMillimeters() === dime.getDiameterInMillimeters() &&
      coin.getThicknessInMillimeters() === dime.getThicknessInMillimeters()
    );
  }

  function coinIsQuarter(coin) {
    var quarter = Quarter.create();

    return (
      coin.getWeightInGrams() === quarter.getWeightInGrams() &&
      coin.getDiameterInMillimeters() === quarter.getDiameterInMillimeters() &&
      coin.getThicknessInMillimeters() === quarter.getThicknessInMillimeters()
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

  function pressButton(buttonText) {
    if (buttonText === 'Return Coins') {
      while (coinsInserted.length > 0) {
        coinReturn.addCoinToContents(coinsInserted.pop());
      }

      return undefined;
    } else if (
      buttonText === 'Cola' ||
      buttonText === 'Chips' ||
      buttonText === 'Candy'
    ) {
      var productName = buttonText;
    } else {
      return undefined;
    }

    var centsInserted = getTotalValueOfCoinsInCents(coinsInserted);

    var productCostInCents = getProductCostInCents(productName);

    if (centsInserted < productCostInCents) {
      display.setText('PRICE: $' + (productCostInCents / 100).toFixed(2));
    } else if (productIsSoldOut(productName)) {
      display.setText('SOLD OUT');
    } else {
      while (coinsInserted.length > 0) {
        coinsOnHand.push(coinsInserted.pop());
      }

      dispenseProduct(productName);
      makeChange(centsInserted, productCostInCents);
      display.setText('THANK YOU');
      endTransaction();
    }
  }

  function getProductCostInCents(productName) {
    if (productName === 'Cola') {
      return 100;
    } else if (productName === 'Chips') {
      return 50;
    } else if (productName === 'Candy') {
      return 65;
    }
  }

  function productIsSoldOut(productName) {
    return productsOnHand.every(function (product) {
      product.getName() !== productName;
    });
  }

  function dispenseProduct(productName) {
    var product = (function () {
      for (var i = 0; i < productsOnHand.length; i += 1) {
        if (productsOnHand[i].getName() === productName) {
          return productsOnHand.splice(i, 1).pop();
        }
      }
    })();

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
    stockWithProducts: stockWithProducts,
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
