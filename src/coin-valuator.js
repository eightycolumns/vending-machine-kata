var CoinValuator = (function () {

function create() {
  var coinIdentifier = CoinIdentifier.create();

  function getValueOfCoinInCents(coin) {
    if (coinIdentifier.coinIsPenny(coin)) {
      return 1;
    } else if (coinIdentifier.coinIsNickel(coin)) {
      return 5;
    } else if (coinIdentifier.coinIsDime(coin)) {
      return 10;
    } else if (coinIdentifier.coinIsQuarter(coin)) {
      return 25;
    }
  }

  return deepFreeze({
    getValueOfCoinInCents: getValueOfCoinInCents
  });
}

return deepFreeze({
  create: create
});

})();
