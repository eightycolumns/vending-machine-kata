var CoinCollection = (function () {

function create() {
  var coinIdentifier = CoinIdentifier.create();

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
    coinValuesInCents = {
      penny: 1,
      nickel: 5,
      dime: 10,
      quarter: 25
    };

    var totalValueInCents = 0;

    collection.getContents().forEach(function (coin) {
      if (coinIdentifier.coinIsPenny(coin)) {
        totalValueInCents += coinValuesInCents.penny;
      } else if (coinIdentifier.coinIsNickel(coin)) {
        totalValueInCents += coinValuesInCents.nickel;
      } else if (coinIdentifier.coinIsDime(coin)) {
        totalValueInCents += coinValuesInCents.dime;
      } else if (coinIdentifier.coinIsQuarter(coin)) {
        totalValueInCents += coinValuesInCents.quarter;
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
