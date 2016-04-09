var CoinCollection = (function () {

function create() {
  var coinIdentifier = CoinIdentifier.create();
  var coinValuator = CoinValuator.create();

  var collection = Collection.create();

  function containsDime() {
    return collection.getContents().some(function (coin) {
      return coinIdentifier.coinIsDime(coin);
    });
  }

  function containsNickel() {
    return collection.getContents().some(function (coin) {
      return coinIdentifier.coinIsNickel(coin);
    });
  }

  function containsPenny() {
    return collection.getContents().some(function (coin) {
      return coinIdentifier.coinIsPenny(coin);
    });
  }

  function containsQuarter() {
    return collection.getContents().some(function (coin) {
      return coinIdentifier.coinIsQuarter(coin);
    });
  }

  function getTotalValueInCents() {
    var penny = Penny.create();
    var nickel = Nickel.create();
    var dime = Dime.create();
    var quarter = Quarter.create();

    var valueOfPennyInCents = coinValuator.getValueOfCoinInCents(penny);
    var valueOfNickelInCents = coinValuator.getValueOfCoinInCents(nickel);
    var valueOfDimeInCents = coinValuator.getValueOfCoinInCents(dime);
    var valueOfQuarterInCents = coinValuator.getValueOfCoinInCents(quarter);

    var totalValueInCents = 0;

    collection.getContents().forEach(function (coin) {
      if (coinIdentifier.coinIsPenny(coin)) {
        totalValueInCents += valueOfPennyInCents;
      } else if (coinIdentifier.coinIsNickel(coin)) {
        totalValueInCents += valueOfNickelInCents;
      } else if (coinIdentifier.coinIsDime(coin)) {
        totalValueInCents += valueOfDimeInCents;
      } else if (coinIdentifier.coinIsQuarter(coin)) {
        totalValueInCents += valueOfQuarterInCents;
      }
    });

    return totalValueInCents;
  }

  return deepFreeze({
    containsDime: containsDime,
    containsNickel: containsNickel,
    containsPenny: containsPenny,
    containsQuarter: containsQuarter,
    getSize: collection.getSize,
    getTotalValueInCents: getTotalValueInCents,
    isEmpty: collection.isEmpty,
    pop: collection.pop,
    push: collection.push
  });
}

return deepFreeze({
  create: create
});

})();
