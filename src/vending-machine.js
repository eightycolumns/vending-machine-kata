var VendingMachine = (function () {

function create() {
  var coinIdentifier = CoinIdentifier.create();

  var display = Display.create('EXACT CHANGE ONLY');

  var coinsInserted = CoinCollection.create();
  var coinReturnContents = CoinCollection.create();

  var dimesOnHand = CoinCollection.create();
  var nickelsOnHand = CoinCollection.create();
  var quartersOnHand = CoinCollection.create();

  var outputBinContents = ProductCollection.create();

  var colaOnHand = ProductCollection.create();
  var chipsOnHand = ProductCollection.create();
  var candyOnHand = ProductCollection.create();

  function getCoinReturnContents() {
    return coinReturnContents;
  }

  function getOutputBinContents() {
    return outputBinContents;
  }

  function getDisplayText() {
    return display.getText();
  }

  function insertCoins(coins) {
    coins.forEach(function (coin) {
      if (coinIdentifier.coinIsNickel(coin)) {
        acceptCoin(coin);
      } else if (coinIdentifier.coinIsDime(coin)) {
        acceptCoin(coin);
      } else if (coinIdentifier.coinIsQuarter(coin)) {
        acceptCoin(coin);
      } else {
        rejectCoin(coin);
      }
    });
  }

  function acceptCoin(coin) {
    coinsInserted.push(coin);
    var centsInserted = coinsInserted.getTotalValueInCents();
    var displayText = formatCentsForDisplay(centsInserted);
    display.setText(displayText);
  }

  function formatCentsForDisplay(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  function rejectCoin(coin) {
    coinReturnContents.push(coin);
  }

  function pressButton(buttonText) {
    if (buttonText === 'Return Coins') {
      pressCoinReturnButton();
    } else {
      pressProductButton(buttonText);
    }
  }

  function pressCoinReturnButton() {
    while (!coinsInserted.isEmpty()) {
      coinReturnContents.push(coinsInserted.pop());
    }
  }

  function pressProductButton(productName) {
    var centsInserted = coinsInserted.getTotalValueInCents();
    var productCostInCents = getProductCostInCents(productName);

    if (centsInserted < productCostInCents) {
      var displayText = 'PRICE: ' + formatCentsForDisplay(productCostInCents);
      display.setText(displayText);
    } else if (productIsSoldOut(productName)) {
      display.setText('SOLD OUT');
    } else {
      sellProduct(productName);
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
    if (productName === 'Cola') {
      return colaOnHand.isEmpty();
    } else if (productName === 'Chips') {
      return chipsOnHand.isEmpty();
    } else if (productName === 'Candy') {
      return candyOnHand.isEmpty();
    }
  }

  function sellProduct(productName) {
    var centsInserted = coinsInserted.getTotalValueInCents();
    var productCostInCents = getProductCostInCents(productName);

    moveCoinsInsertedToCoinsOnHand();
    dispenseProduct(productName);
    makeChange(centsInserted, productCostInCents);
    display.setText('THANK YOU');
  }

  function moveCoinsInsertedToCoinsOnHand() {
    while (!coinsInserted.isEmpty()) {
      var coin = coinsInserted.pop();

      if (coinIdentifier.coinIsNickel(coin)) {
        nickelsOnHand.push(coin);
      } else if (coinIdentifier.coinIsDime(coin)) {
        dimesOnHand.push(coin);
      } else if (coinIdentifier.coinIsQuarter(coin)) {
        quartersOnHand.push(coin);
      }
    }
  }

  function dispenseProduct(productName) {
    if (productName === 'Cola') {
      outputBinContents.push(colaOnHand.pop());
    } else if (productName === 'Chips') {
      outputBinContents.push(chipsOnHand.pop());
    } else if (productName === 'Candy') {
      outputBinContents.push(candyOnHand.pop());
    }
  }

  function makeChange(centsInserted, productCostInCents) {
    var changeDueInCents = centsInserted - productCostInCents;

    coinValuesInCents = {
      nickel: 5,
      dime: 10,
      quarter: 25
    };

    while (changeDueInCents > 0) {
      if (changeDueInCents >= coinValuesInCents.quarter) {
        coinReturnContents.push(quartersOnHand.pop());
        changeDueInCents -= coinValuesInCents.quarter;
      } else if (changeDueInCents >= coinValuesInCents.dime) {
        coinReturnContents.push(dimesOnHand.pop());
        changeDueInCents -= coinValuesInCents.dime;
      } else if (changeDueInCents >= coinValuesInCents.nickel) {
        coinReturnContents.push(nickelsOnHand.pop());
        changeDueInCents -= coinValuesInCents.nickel;
      }
    }
  }

  function stockWithCoins(coins) {
    coins.forEach(function (coin) {
      if (coinIdentifier.coinIsNickel(coin)) {
        nickelsOnHand.push(coin);
      } else if (coinIdentifier.coinIsDime(coin)) {
        dimesOnHand.push(coin);
      } else if (coinIdentifier.coinIsQuarter(coin)) {
        quartersOnHand.push(coin);
      }

      if (canMakeChange()) {
        display.setText('INSERT COINS');
      }
    });
  }

  function canMakeChange() {
    return (
      (nickelsOnHand.getSize() > 3) ||
      (nickelsOnHand.getSize() > 1 && dimesOnHand.getSize() > 0) ||
      (nickelsOnHand.getSize() > 0 && dimesOnHand.getSize() > 1)
    );
  }

  function stockWithProducts(products) {
    products.forEach(function (product) {
      if (product.getName() === 'Cola') {
        colaOnHand.push(product);
      } else if (product.getName() === 'Chips') {
        chipsOnHand.push(product);
      } else if (product.getName() === 'Candy') {
        candyOnHand.push(product);
      }
    });
  }

  return deepFreeze({
    getCoinReturnContents: getCoinReturnContents,
    getOutputBinContents: getOutputBinContents,
    getDisplayText: getDisplayText,
    insertCoins: insertCoins,
    pressButton: pressButton,
    stockWithCoins: stockWithCoins,
    stockWithProducts: stockWithProducts
  });
}

return deepFreeze({
  create: create
});

})();
