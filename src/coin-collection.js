var CoinCollection = (function () {

function create() {
  var coinIdentifier = CoinIdentifier.create();

  var contents = [];

  function containsDime() {
    return contents.some(function (coin) {
      return coinIdentifier.coinIsDime(coin);
    });
  }

  function containsNickel() {
    return contents.some(function (coin) {
      return coinIdentifier.coinIsNickel(coin);
    });
  }

  function containsPenny() {
    return contents.some(function (coin) {
      return coinIdentifier.coinIsPenny(coin);
    });
  }

  function containsQuarter() {
    return contents.some(function (coin) {
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

    contents.forEach(function (coin) {
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

  function isEmpty() {
    return contents.length === 0;
  }

  function pop() {
    return contents.pop();
  }

  function push(coin) {
    contents.push(coin);
  }

  return deepFreeze({
    containsDime: containsDime,
    containsNickel: containsNickel,
    containsPenny: containsPenny,
    containsQuarter: containsQuarter,
    getTotalValueInCents: getTotalValueInCents,
    isEmpty: isEmpty,
    pop: pop,
    push: push
  });
}

return deepFreeze({
  create: create
});

})();
