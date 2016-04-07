describe('The vending machine', function () {
  var vendingMachine = undefined;

  beforeEach(function () {
    vendingMachine = VendingMachine.create();
  });

  it('displays "INSERT COINS" when no coins have been inserted', function () {
    expect(vendingMachine.display.getText()).toBe('INSERT COINS');
  });

  it('accepts nickels', function () {
    var originalDisplayText = vendingMachine.display.getText();

    var nickel = Nickel.create();
    vendingMachine.insertCoin(nickel);

    expect(vendingMachine.display.getText()).not.toBe(originalDisplayText);
  });

  it('displays "$0.05" when a nickel is inserted', function () {
    var nickel = Nickel.create();
    vendingMachine.insertCoin(nickel);

    expect(vendingMachine.display.getText()).toBe('$0.05');
  });

  it('accepts dimes', function () {
    var originalDisplayText = vendingMachine.display.getText();

    var dime = Dime.create();
    vendingMachine.insertCoin(dime);

    expect(vendingMachine.display.getText()).not.toBe(originalDisplayText);
  });

  it('displays "$0.10" when a dime is inserted', function () {
    var dime = Dime.create();
    vendingMachine.insertCoin(dime);

    expect(vendingMachine.display.getText()).toBe('$0.10');
  });

  it('accepts quarters', function () {
    var originalDisplayText = vendingMachine.display.getText();

    var quarter = Quarter.create();
    vendingMachine.insertCoin(quarter);

    expect(vendingMachine.display.getText()).not.toBe(originalDisplayText);
  });

  it('displays "$0.25" when a quarter is inserted', function () {
    var quarter = Quarter.create();
    vendingMachine.insertCoin(quarter);

    expect(vendingMachine.display.getText()).toBe('$0.25');
  });

  it('rejects pennies', function () {
    var penny = Penny.create();
    vendingMachine.insertCoin(penny);

    expect(vendingMachine.coinReturn.getContents()).toContain(penny);
  });

  it('displays the total amount inserted', function () {
    var coins = [
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    ];

    vendingMachine.insertCoins(coins);

    expect(vendingMachine.display.getText()).toBe('$1.00');
  });

  it('returns the coins that have been inserted when the "Return Coins" button is pressed', function () {
    var quarter = Quarter.create();
    vendingMachine.insertCoin(quarter);

    vendingMachine.pressButton('Return Coins');

    expect(vendingMachine.coinReturn.getContents()).toContain(quarter);
  });

  it('displays the cost of the product when a button is pressed before enough money has been inserted', function () {
    var quarter = Quarter.create();
    vendingMachine.insertCoin(quarter);

    vendingMachine.pressButton('Cola');

    expect(vendingMachine.display.getText()).toBe('PRICE: $1.00');
  });

  it('displays "SOLD OUT" when the selected product is out of stock', function () {
    var coins = [
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    ];

    vendingMachine.insertCoins(coins);

    vendingMachine.pressButton('Cola');

    expect(vendingMachine.display.getText()).toBe('SOLD OUT');
  });

  it('dispenses cola when cola is purchased', function () {
    vendingMachine.stockWithProducts([
      Cola.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Cola');

    var outputBinContents = vendingMachine.outputBin.getContents();

    var outputBinContainsCola = outputBinContents.some(function (product) {
      return product.getName() === 'Cola';
    });

    expect(outputBinContainsCola).toBe(true);
  });

  it('dispenses chips when chips are purchased', function () {
    vendingMachine.stockWithProducts([
      Chips.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Chips');

    var outputBinContents = vendingMachine.outputBin.getContents();

    var outputBinContainsChips = outputBinContents.some(function (product) {
      return product.getName() === 'Chips';
    });

    expect(outputBinContainsChips).toBe(true);
  });

  it('dispenses candy when candy is purchased', function () {
    vendingMachine.stockWithProducts([
      Candy.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create(),
      Dime.create(),
      Nickel.create()
    ]);

    vendingMachine.pressButton('Candy');

    var outputBinContents = vendingMachine.outputBin.getContents();

    var outputBinContainsCandy = outputBinContents.some(function (product) {
      return product.getName() === 'Candy';
    });

    expect(outputBinContainsCandy).toBe(true);
  });

  it('displays "THANK YOU" when an item is purchased', function () {
    vendingMachine.stockWithProducts([
      Cola.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Cola');

    expect(vendingMachine.display.getText()).toBe('THANK YOU');
  });

  it('makes change when the amount inserted exceeds the cost of the product purchased', function () {
    vendingMachine.stockWithProducts([
      Candy.create()
    ]);

    vendingMachine.insertCoins([
      Quarter.create(),
      Quarter.create(),
      Quarter.create()
    ]);

    vendingMachine.pressButton('Candy');

    var coinReturnContents = vendingMachine.coinReturn.getContents();

    var coinReturnContainsDime = coinReturnContents.some(function (coin) {
      return coinIsDime(coin);
    });

    expect(coinReturnContainsDime).toBe(true);
  });
});

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

describe('Coins', function () {
  describe('Pennies', function () {
    var penny = Penny.create();

    it('weigh 2.5 g', function () {
      expect(penny.getWeightInGrams()).toBe(2.5);
    });

    it('are 19.05 mm in diameter', function () {
      expect(penny.getDiameterInMillimeters()).toBe(19.05);
    });

    it('are 1.52 mm thick', function () {
      expect(penny.getThicknessInMillimeters()).toBe(1.52);
    });
  });

  describe('Nickels', function () {
    var nickel = Nickel.create();

    it('weigh 5 g', function () {
      expect(nickel.getWeightInGrams()).toBe(5);
    });

    it('are 21.21 mm in diameter', function () {
      expect(nickel.getDiameterInMillimeters()).toBe(21.21);
    });

    it('are 1.95 mm thick', function () {
      expect(nickel.getThicknessInMillimeters()).toBe(1.95);
    });
  });

  describe('Dimes', function () {
    var dime = Dime.create();

    it('weigh 2.268 g', function () {
      expect(dime.getWeightInGrams()).toBe(2.268);
    });

    it('are 17.91 mm in diameter', function () {
      expect(dime.getDiameterInMillimeters()).toBe(17.91);
    });

    it('are 1.35 mm thick', function () {
      expect(dime.getThicknessInMillimeters()).toBe(1.35);
    });
  });

  describe('Quarter', function () {
    var quarter = Quarter.create();

    it('weigh 5.67 g', function () {
      expect(quarter.getWeightInGrams()).toBe(5.67);
    });

    it('are 24.26 mm in diameter', function () {
      expect(quarter.getDiameterInMillimeters()).toBe(24.26);
    });

    it('are 1.75 mm thick', function () {
      expect(quarter.getThicknessInMillimeters()).toBe(1.75);
    });
  });
});

describe('Products', function () {
  describe('Cola', function () {
    var cola = Cola.create();

    it('costs $1.00', function () {
      expect(cola.getCostInCents()).toBe(100);
    });
  });

  describe('Chips', function () {
    var chips = Chips.create();

    it('cost $0.50', function () {
      expect(chips.getCostInCents()).toBe(50);
    });
  });

  describe('Candy', function () {
    var candy = Candy.create();

    it('costs $0.65', function () {
      expect(candy.getCostInCents()).toBe(65);
    });
  });
});
