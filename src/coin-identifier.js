var CoinIdentifier = (function () {

function create() {

  function coinIsPenny(coin) {
    var penny = Penny.create();

    return (
      coin.getWeightInGrams() === penny.getWeightInGrams() &&
      coin.getDiameterInMillimeters() === penny.getDiameterInMillimeters() &&
      coin.getThicknessInMillimeters() === penny.getThicknessInMillimeters()
    );
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

  return deepFreeze({
    coinIsPenny: coinIsPenny,
    coinIsNickel: coinIsNickel,
    coinIsDime: coinIsDime,
    coinIsQuarter: coinIsQuarter
  });
}

return deepFreeze({
  create: create
});

})();
