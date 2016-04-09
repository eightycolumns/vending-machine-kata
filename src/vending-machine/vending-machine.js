var VendingMachine = (function () {

function create() {
  var display = Display.create('EXACT CHANGE ONLY');
  var timer = Timer.create();

  var coinsInserted = CoinCollection.create();
  var coinReturnContents = CoinCollection.create();

  var dimesOnHand = CoinCollection.create();
  var nickelsOnHand = CoinCollection.create();
  var quartersOnHand = CoinCollection.create();

  var coinIdentifier = CoinIdentifier.create();
  var coinValuator = CoinValuator.create();

  var outputBinContents = ProductCollection.create();

  var colaOnHand = ProductCollection.create();
  var chipsOnHand = ProductCollection.create();
  var candyOnHand = ProductCollection.create();

  var productPricer = ProductPricer.create();

  function getCoinReturnContents() {
    return coinReturnContents;
  }

  function getOutputBinContents() {
    return outputBinContents;
  }

  function getDisplayText() {
    return display.getText();
  }

  function insertCoins() {
    for (var i = 0; i < arguments.length; i += 1) {
      var coin = arguments[i];

      if (coinIdentifier.coinIsNickel(coin)) {
        acceptCoin(coin);
      } else if (coinIdentifier.coinIsDime(coin)) {
        acceptCoin(coin);
      } else if (coinIdentifier.coinIsQuarter(coin)) {
        acceptCoin(coin);
      } else {
        rejectCoin(coin);
      }
    }
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

    if (canMakeChange()) {
      display.setText('INSERT COINS');
    } else {
      display.setText('EXACT CHANGE ONLY');
    }
  }

  function canMakeChange() {
    return (
      (nickelsOnHand.getSize() > 3) ||
      (nickelsOnHand.getSize() > 1 && dimesOnHand.getSize() > 0) ||
      (nickelsOnHand.getSize() > 0 && dimesOnHand.getSize() > 1)
    );
  }

  function pressProductButton(productName) {
    var centsInserted = coinsInserted.getTotalValueInCents();
    var productPriceInCents = productPricer.getProductPriceInCents(productName);

    if (centsInserted < productPriceInCents) {
      var displayText = 'PRICE: ' + formatCentsForDisplay(productPriceInCents);
      display.setText(displayText);

      timer.wait(5000, function () {
        var displayText = formatCentsForDisplay(centsInserted);
        display.setText(displayText);
      });
    } else if (productIsSoldOut(productName)) {
      display.setText('SOLD OUT');
    } else {
      sellProduct(productName);
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
    var productPriceInCents = productPricer.getProductPriceInCents(productName);

    moveCoinsInsertedToCoinsOnHand();
    dispenseProduct(productName);
    makeChange(centsInserted, productPriceInCents);
    display.setText('THANK YOU');

    timer.wait(5000, function () {
      if (canMakeChange()) {
        display.setText('INSERT COINS');
      } else {
        display.setText('EXACT CHANGE ONLY');
      }
    });
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

  function makeChange(centsInserted, productPriceInCents) {
    var changeDueInCents = centsInserted - productPriceInCents;

    var coinValuator = CoinValuator.create();

    var nickel = Nickel.create();
    var dime = Dime.create();
    var quarter = Quarter.create();

    var valueOfNickelInCents = coinValuator.getValueOfCoinInCents(nickel);
    var valueOfDimeInCents = coinValuator.getValueOfCoinInCents(dime);
    var valueOfQuarterInCents = coinValuator.getValueOfCoinInCents(quarter);

    while (changeDueInCents > 0) {
      if (changeDueInCents >= valueOfQuarterInCents) {
        coinReturnContents.push(quartersOnHand.pop());
        changeDueInCents -= valueOfQuarterInCents;
      } else if (changeDueInCents >= valueOfDimeInCents) {
        coinReturnContents.push(dimesOnHand.pop());
        changeDueInCents -= valueOfDimeInCents;
      } else if (changeDueInCents >= valueOfNickelInCents) {
        coinReturnContents.push(nickelsOnHand.pop());
        changeDueInCents -= valueOfNickelInCents;
      }
    }
  }

  function setProductPriceInCents(productName, productPriceInCents) {
    productPricer.setProductPriceInCents(productName, productPriceInCents);
  }

  function stockWithCoins() {
    for (var i = 0; i < arguments.length; i += 1) {
      var coin = arguments[i];

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
    }
  }

  function stockWithProducts() {
    for (var i = 0; i < arguments.length; i += 1) {
      var product = arguments[i];

      if (product.getName() === 'Cola') {
        colaOnHand.push(product);
      } else if (product.getName() === 'Chips') {
        chipsOnHand.push(product);
      } else if (product.getName() === 'Candy') {
        candyOnHand.push(product);
      }
    }
  }

  return deepFreeze({
    getCoinReturnContents: getCoinReturnContents,
    getOutputBinContents: getOutputBinContents,
    getDisplayText: getDisplayText,
    insertCoins: insertCoins,
    pressButton: pressButton,
    setProductPriceInCents: setProductPriceInCents,
    stockWithCoins: stockWithCoins,
    stockWithProducts: stockWithProducts
  });
}

return deepFreeze({
  create: create
});

})();
